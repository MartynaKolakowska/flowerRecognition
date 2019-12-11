import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import PredictFromCamera from "./components/cameraPrediction";
import UploadImage from "./components/uploadImage";
import PredicitonResult from "./components/predictionResult";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import observableStore from "./store";

import { Provider } from "mobx-react";

var firebaseConfig = {
  apiKey: "AIzaSyDZzQ6NaokuEchdbI4peckwJAWuJoAC8Nc",
  authDomain: "flowerrecognition-1c6fa.firebaseapp.com",
  databaseURL: "https://flowerrecognition-1c6fa.firebaseio.com",
  projectId: "flowerrecognition-1c6fa",
  storageBucket: "flowerrecognition-1c6fa.appspot.com",
  messagingSenderId: "642049652780",
  appId: "1:642049652780:web:cb58afb1ebb426a1e9f989",
  measurementId: "G-SMP21QKZK5"
}

export function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("CameraPrediction")}
        >
          <Text style={styles.text}>Take a picture</Text>
        </TouchableOpacity>
        <Text style={styles.textOR}>or</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("UploadImage")}
        >
          <Text style={styles.text}>Upload an image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    CameraPrediction: PredictFromCamera,
    UploadImage: UploadImage,
    PredicitonResult: PredicitonResult
  },
  {
    initialRouteName: "Home",
    headerMode: 'none'
  },
  
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider observableStore={observableStore}>
        <AppContainer />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#385659",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    backgroundColor: "#e6e7e8",
    padding: 20,
    margin: 40,
    textAlign: "center",
    borderRadius:10
  },
  text: {
    color: "#385659",
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center"
  },
  textOR: {
    color: "#e6e7e8",
    fontWeight: "700",
    fontSize: 24,
    textAlign: "center"
  }
});
