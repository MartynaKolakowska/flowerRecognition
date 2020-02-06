import React from "react";
import { View, StatusBar, Text, Button } from "react-native";
import { inject, observer } from "mobx-react";
import { RowItem } from "./rowItem";

const QuizIndex: React.FC<any> = props => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        display: "flex"
      }}>
      <StatusBar barStyle='dark-content' />
      <Button
        title='Test your knowledge about flowers'
        onPress={() =>
          props.navigation.navigate("Quiz", {
            title: "Space",
            questions: props.observableStore.store.questions,
            color: "#36b1f0"
          })
        }
      />
    </View>
  );
};

export default inject("observableStore")(observer(QuizIndex));
