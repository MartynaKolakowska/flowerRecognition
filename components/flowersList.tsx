import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { inject, observer } from "mobx-react";
import { db } from "../config";
let flowersRef = db.ref("/flowers");

const FlowersList = props => {
  const [flowers, setFlowers] = React.useState([]);
  React.useEffect(() => {
    flowersRef.on("value", snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      setFlowers(items);
    });
  }, []);
  return (
    <View style={styles.container}>
      {flowers.length > 0 ? (
        flowers.map(item => <Text key={item.id}>{item.name}</Text>)
      ) : (
        <Text>No items</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ebebeb"
  }
});

export default inject("observableStore")(observer(FlowersList));
