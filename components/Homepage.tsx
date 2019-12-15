import React from "react";
import { Text, View, TouchableOpacity, Button, StyleSheet } from "react-native";
import { Icon } from "native-base";

export class HomeScreen extends React.Component<any> {
  static navigationOptions = ({ screenProps }) => ({
    title: "Home",
    headerLeft: (
      <Icon
        onPress={() => screenProps.openDraw()}
        name='menu'
        style={{ fontSize: 32, color: "#192e2f", marginLeft: 20 }}
      />
    )
  });

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("CameraPrediction")}>
            <Text style={styles.text}>Take a picture</Text>
          </TouchableOpacity>
          <Text style={styles.textOR}>or</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("UploadImage")}>
            <Text style={styles.text}>Upload an image</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#385659"
  },
  header: {
    backgroundColor: "#e6e7e8"
  },
  button: {
    backgroundColor: "#e6e7e8",
    padding: 20,
    margin: 40,
    textAlign: "center",
    borderRadius: 10
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

export default HomeScreen;
