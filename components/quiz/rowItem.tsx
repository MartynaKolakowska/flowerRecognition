import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export const RowItem = ({ onPress = () => {}, name, color }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <View style={[styles.row, { backgroundColor: color }]}>
      <Text style={styles.text}>{name}</Text>
    </View>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: "hotpink",
    marginBottom: 1
  },
  text: {
    fontSize: 18,
    color: "red",
    fontWeight: "600"
  }
});
