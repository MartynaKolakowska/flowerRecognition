import React from "react";
import { firebase } from "../config";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { db } from "../config";
import { inject, observer } from "mobx-react";

let flowersRef = db.ref("/flowers");

class Loading extends React.Component<any> {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "Home" : "SignUp");
    });
    flowersRef.on("value", snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      if (items.length) {
        this.props.observableStore.setFlowers(items);
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size='large' />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default inject("observableStore")(observer(Loading));
