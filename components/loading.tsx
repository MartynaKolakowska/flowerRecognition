import React from "react";
import { firebase } from "../config";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { db } from "../config";
import { inject, observer } from "mobx-react";
import i18n from "i18n-js";
import "../translations";
import * as Localization from "expo-localization";
import { questionsPL, questionsEN } from "../store";

let flowersRef =
  Localization.locale === "pl-PL" ? db.ref("/kwiaty") : db.ref("/flowers");

const questions = Localization.locale === "pl-PL" ? questionsPL : questionsEN;

class Loading extends React.Component<any> {
  static navigationOptions = {
    header: null
  };
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
    this.props.observableStore.setQuestions(questions);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{i18n.t("loading")}</Text>
        <ActivityIndicator size='large' />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#385659"
  },
  text: {
    color: "#e6e7e8",
    fontWeight: "700",
    fontSize: 24,
    textAlign: "center"
  }
});

export default inject("observableStore")(observer(Loading));
