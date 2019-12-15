import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const Button = props => {
  const { textStyle, buttonStyle } = styles;
  if (props.main) {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={[
          buttonStyle,
          {
            borderColor: colors.mainButtonTextColor,
            backgroundColor: colors.mainButtonColor,
            margin: props.margin || 5
          }
        ]}>
        {/* <Text style={[textStyle, { color: colors.mainButtonTextColor }]}>
          {props.title}
        </Text> */}
        <Icon name='rocket' size={30} color='#900' />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={props.onPress} style={[buttonStyle]}>
      {/* <Text style={[textStyle, { color: colors.secondaryButtonTextColor }]}>
        {props.title}
      </Text> */}
      <Icon name='camera' size={60} color='#e6e7e8' />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: "center",
    fontSize: 10,
    fontWeight: "500"
  },
  buttonStyle: {
    borderWidth: 0,
    borderRadius: 50,
    marginTop: 30,
    paddingBottom: 30,
    marginBottom: 30,
    alignSelf: "center"
  }
});
const colors = {
  mainButtonTextColor: "white",
  mainButtonColor: "rgba(31, 130, 83, 1)",
  secondaryButtonTextColor: "black",
  secondaryButtonColor: "white"
};

export { Button };
