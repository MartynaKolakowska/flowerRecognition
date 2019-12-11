import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { inject, observer } from "mobx-react";
import CapitalizedText from './capitalizedText'

const PredictionResult = props => {
  const [bestTag, setBestTag] = React.useState("");
  const [maxProb, setMaxProb] = React.useState(0);

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
  };
  React.useEffect(() => {
    setNewPrediction(props.observableStore.store.predictionsResponse);
  });

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: props.observableStore.store.uploadedImage }}
        style={{ width: 300, height: 300,marginBottom:20 }}
      />
      <Text style={styles.text}>AI says:</Text>
      <CapitalizedText style={styles.heading}>{bestTag}</CapitalizedText>
      <Text style={styles.text}>Probability:</Text>
      <Text style={styles.heading}>{maxProb.toString()}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate("Home")}
      >
        <Text style={[styles.text,{color:'#182d2e'}]}>Check again</Text>
      </TouchableOpacity>
    </View>
  );
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
    margin:10,
    textAlign: "center",
    borderRadius: 10
  }
});
