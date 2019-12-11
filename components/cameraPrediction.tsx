import React from "react";
import { Text, View, StyleSheet } from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import { Camera } from "expo-camera";
import { Button } from "./button";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import { inject, observer } from "mobx-react";

const DEFAULT_TAG_TEXT = "Hey, I'm your custom fashion police!";
const PREDICTION_KEY = "f2ceeca2e71740e3ab19389f4d9e6400";
const PREDICTION_URL =
  "https://westus2.api.cognitive.microsoft.com/customvision/v3.0/Prediction/9c3df89a-cf55-450b-bd25-1ff2f9de379e/classify/iterations/Iteration2/url";
const IMGUR_API_ID = "df12b8e0186a3e9";

class PredictFromCamera extends React.Component<any> {
  state = {
    tagText: DEFAULT_TAG_TEXT,
    flash: "off",
    zoom: 0,
    autoFocus: "on",
    depth: 0,
    ratio: "16:9",
    ratios: [],
    photoId: 1,
    photoIdTag: 1,
    whiteBalance: "auto",
    loading: false,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };
  camera: any;

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  async componentDidMount() {
    var file_info = await FileSystem.getInfoAsync(
      FileSystem.documentDirectory + "photos"
    );
    if (!file_info.exists) {
      FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + "photos"
      ).catch(e => {
        console.log(e, "Directory exists");
      });
    }
  }

  // Takes picture, then calls sendToImgur
  async takePicture() {
    var photoLoc = `${FileSystem.documentDirectory}photos/Photo_${this.state.photoId}_Base64`;
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({ base64: true });
      FileSystem.moveAsync({
        from: photo.uri,
        to: photoLoc
      }).then(() => {
        this.setState({
          photoId: this.state.photoId + 1,
          loading: true
        });
        this.sendToImgur(photoLoc);
      });
    }
  }

  // Downsizes photo and uses Imgur API to
  // get a web url of photo, sends to Prediction API
  // (calls sendToMicrosoftPrediction)
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
            this.props.observableStore.setUploadedImage(imgur_json.data.link);
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

  // Uses Prediction API to process photo at a web url
  // and calls setNewPrediction
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

  resetPredictionText() {
    this.setState({
      tagText: DEFAULT_TAG_TEXT
    });
  }

  render() {
    const { hasCameraPermission } = this.state;
    console.log(this.state.loading);
    if (hasCameraPermission === null) {
      return (
        <View>
          <Text>???</Text>
        </View>
      );
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.cameraView}>
          {!this.state.loading ? (
            <Camera
              ref={ref => {
                this.camera = ref;
              }}
              style={{ flex: 1 }}
              type={this.state.type}
              flashMode={this.state.flash}
              autoFocus={this.state.autoFocus}
              zoom={this.state.zoom}
              whiteBalance={this.state.whiteBalance}
              ratio={this.state.ratio}
              focusDepth={this.state.depth}
            >
              <View style={styles.cameraView}>
                <View style={styles.buttonContainerView}>
                  <Button
                    style={styles.buttonContainerView}
                    title="Take"
                    onPress={() => {
                      this.takePicture();
                    }}
                  />
                </View>
              </View>
            </Camera>
          ) : (
            <View style={styles.container} >
              <Text style={styles.textStyle}>Loading...</Text>
            </View>
          )}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  cameraView: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "stretch",
    backgroundColor: "transparent"
  },
  tagTextView: {
    backgroundColor: "white",
    height: 90,
    margin: 20,
    marginTop: 30,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainerView: {
    backgroundColor: "#3856596b",
    display: "flex",
    alignSelf: "stretch"
  },
  textStyle: {
    color: "#182d2e",
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
});

export default inject("observableStore")(observer(PredictFromCamera));
