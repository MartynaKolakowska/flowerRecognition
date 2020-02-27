import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { inject, observer } from "mobx-react";
import i18n from "i18n-js";
import "../../translations";

const QuizResult: React.FC<any> = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.result}>
        {props.observableStore.store.quizScore} /{" "}
        {props.observableStore.store.questions.length}
      </Text>
      {props.observableStore.store.quizScore >= 0 &&
        props.observableStore.store.quizScore < 4 && (
          <>
            <Text style={styles.result}>{i18n.t("poor")}</Text>
            <Text style={styles.text}>{i18n.t("poorText")}</Text>
          </>
        )}
      {props.observableStore.store.quizScore >= 4 &&
        props.observableStore.store.quizScore < 7 && (
          <>
            <Text style={styles.result}>{i18n.t("average")}</Text>
            <Text style={styles.text}>{i18n.t("averageText")}</Text>
          </>
        )}
      {props.observableStore.store.quizScore >= 7 && (
        <>
          <Text style={styles.result}>{i18n.t("nice")}</Text>
          <Text style={styles.text}>{i18n.t("niceText")}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#385659",
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#e6e7e8",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "600",
    marginTop: 12
  },
  result: {
    color: "#e6e7e8",
    fontSize: 45,
    textAlign: "center",
    fontWeight: "600"
  }
});

export default inject("observableStore")(observer(QuizResult));
