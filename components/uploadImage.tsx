import * as React from "react";
import { Button, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { inject, observer } from "mobx-react";
import * as ImageManipulator from "expo-image-manipulator";

const PREDICTION_KEY = "f2ceeca2e71740e3ab19389f4d9e6400";
const PREDICTION_URL =
  "https://westus2.api.cognitive.microsoft.com/customvision/v3.0/Prediction/9c3df89a-cf55-450b-bd25-1ff2f9de379e/classify/iterations/Iteration2/url";
const IMGUR_API_ID = "df12b8e0186a3e9";

class UploadImage extends React.Component<any> {
  state = {
    image: null
  };

  render() {
    let { image } = this.state;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center",backgroundColor: "#385659", }}>
        {image ? (
            <Text style={styles.textStyle}>Loading...</Text>
        ) : (
          <TouchableOpacity style={styles.button} onPress={this._pickImage}>
            <Text style={styles.text}>Upload an image</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
    this.props.observableStore.setTest(12);
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  async sendToMicrosoftPrediction(img_url) {
    let response = await fetch(PREDICTION_URL, {
      method: "POST",
      headers: {
        "Prediction-Key": PREDICTION_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Url: img_url
      })
    })
      .then(response => response.json()) // returns promise
      .then(responseJson => {
        console.log(responseJson);
        let predictions = responseJson["predictions"];
        this.props.observableStore.setPredictionsResponse(predictions);
        this.props.navigation.navigate("PredicitonResult");
        // this.setNewPrediction(predictions)
      });
  }

  async sendToImgur(photoLoc) {
    try {
      // Use Image Manipulator to downsize image
      let manipulatedObj = await ImageManipulator.manipulateAsync(
        photoLoc,
        [{ resize: { width: 200 } }],
        { base64: true }
      );
      var xmlHttp = new XMLHttpRequest();
      const data = new FormData();
      xmlHttp.onreadystatechange = e => {
        if (xmlHttp.readyState == 4) {
          if (xmlHttp.status === 200) {
            // Send Imgur link to photo to be sent to Prediction API
            let imgur_json = JSON.parse(xmlHttp.responseText);
            this.sendToMicrosoftPrediction(imgur_json.data.link);
          } else {
            // Debug errors
            console.log(xmlHttp.response);
          }
        }
      };
      xmlHttp.open("POST", "https://api.imgur.com/3/upload", true);
      xmlHttp.setRequestHeader("Authorization", "Client-ID " + IMGUR_API_ID);
      data.append("type", "base64");
      data.append("image", manipulatedObj.base64);
      xmlHttp.send(data);
    } catch (error) {
      console.error(error);
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: (result as any).uri });
      this.sendToImgur(this.state.image);
      this.props.observableStore.setUploadedImage(this.state.image);
    }
  };
}

const styles = StyleSheet.create({
  textStyle: {
    color: "#e6e7e8",
    fontSize: 36,
    fontWeight: "700",
    textAlign: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#b6d2d0",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#385659",
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center"
  },
  button: {
    backgroundColor: "#e6e7e8",
    padding: 20,
    margin: 40,
    textAlign: "center",
    borderRadius: 10
  }
});

export default inject("observableStore")(observer(UploadImage));
