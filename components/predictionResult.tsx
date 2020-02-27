import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { inject, observer } from "mobx-react";
import CapitalizedText from "./utils/capitalizedText";
import i18n from "i18n-js";
import "../translations";

const PredictionResult = props => {
  const [bestTag, setBestTag] = React.useState("");
  const [maxProb, setMaxProb] = React.useState(0);
  const [name, setName] = React.useState("");
  const setNewPrediction = predictions => {
    let maxProb = 0;
    let bestTag = "None";
    for (let predMap of predictions) {
      if (predMap.probability > maxProb) {
        maxProb = predMap.probability;
        bestTag = predMap.tagName;
      }
    }
    setBestTag(bestTag);
    setMaxProb(maxProb);
    props.observableStore.setTag(bestTag);
    props.observableStore.store.flowers.map(item => {
      if (item.id === bestTag) {
        setName(item.name);
      }
    });
  };

  React.useEffect(() => {
    setNewPrediction(props.observableStore.store.predictionsResponse);
  });

  if (bestTag === "others") {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>{i18n.t("notFlower")}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("Home")}>
          <Text style={[styles.text, { color: "#182d2e" }]}>
            {i18n.t("checkAgain")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (bestTag === " otherFlowers") {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>{i18n.t("notDatabaseFlower")}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("Home")}>
          <Text style={[styles.text, { color: "#182d2e" }]}>
            {i18n.t("checkAgain")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: props.observableStore.store.uploadedImage }}
        style={{ width: 250, height: 250, marginBottom: 20 }}
      />
      <Text style={styles.text}> {i18n.t("aiSays")}</Text>
      <CapitalizedText style={styles.heading}>{name}</CapitalizedText>
      <Text style={styles.text}> {i18n.t("probability")}</Text>
      <Text style={styles.heading}>{maxProb.toString()}</Text>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("Home")}>
          <Text style={[styles.text, { color: "#182d2e" }]}>
            {i18n.t("checkAgain")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("AboutFlower")}>
          <Text style={[styles.text, { color: "#182d2e" }]}>
            {i18n.t("moreInformations")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
PredictionResult.navigationOptions = {
  title: i18n.t("result")
};

export default inject("observableStore")(observer(PredictionResult));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#182d2e",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#e6e7e8",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center"
  },
  heading: {
    color: "#b6d2d0",
    fontWeight: "700",
    fontSize: 32,
    textAlign: "center"
  },
  button: {
    backgroundColor: "#e6e7e8",
    padding: 16,
    margin: 10,
    textAlign: "center",
    borderRadius: 10
  }
});
