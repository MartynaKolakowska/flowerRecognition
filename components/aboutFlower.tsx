import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView
} from "react-native";
import { inject, observer } from "mobx-react";
import { BackHandler } from "react-native";
import i18n from "i18n-js";
import "../translations";

class AboutFlower extends React.Component<any> {
  static navigationOptions = () => ({
    title: i18n.t("aboutFlower")
  });
  state = {
    description: "",
    name: "",
    img: "",
    genus: "",
    family: "",
    etymology: ""
  };
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  UNSAFE_componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  UNSAFE_componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }
  componentDidMount() {
    this.props.observableStore.store.flowers.map(item => {
      if (item.id === this.props.observableStore.store.bestTag) {
        this.setState({
          description: item.description,
          name: item.name.toUpperCase(),
          img: item.img,
          etymology: item.etymology,
          genus: item.genus,
          family: item.family
        });
      }
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Image
            source={{ uri: this.state.img }}
            style={{ width: 200, height: 200, marginBottom: 20 }}
          />
          <View
            style={{
              alignItems: "flex-start",
              justifyContent: "flex-start",
              display: "flex"
            }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 8,
                marginLeft: 14
              }}>
              <Text style={styles.heading}>{i18n.t("name")} : </Text>
              <Text style={styles.color}>{this.state.name}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 8,
                marginLeft: 14
              }}>
              <Text style={styles.heading}>{i18n.t("family")} : </Text>
              <Text style={styles.color}>{this.state.family}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 8,
                marginLeft: 14
              }}>
              <Text style={styles.heading}>{i18n.t("genus")} : </Text>
              <Text style={styles.color}>{this.state.genus}</Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              margin: 24,
              alignItems: "stretch"
            }}>
            <Text style={styles.text}>{this.state.etymology}</Text>
          </View>
          <View
            style={{
              display: "flex",
              margin: 24,
              alignItems: "stretch"
            }}>
            <Text style={styles.text}>{this.state.description}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    backgroundColor: "#385659",
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
    fontSize: 24,
    textAlign: "center"
  },
  button: {
    backgroundColor: "#e6e7e8",
    padding: 16,
    margin: 10,
    textAlign: "center",
    borderRadius: 10
  },
  color: {
    color: "#dae8e7",
    fontWeight: "700",
    fontSize: 24,
    textAlign: "center"
  }
});

export default inject("observableStore")(observer(AboutFlower));
