import * as React from "react";
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./components/Homepage";
import PredictFromCamera from "./components/cameraPrediction";
import UploadImage from "./components/uploadImage";
import Login from "./components/register/login";
import SignUp from "./components/register/signUp";
import Loading from "./components/loading";
import StackNavigator from "./StackNavigator";
import { QuizStackNavigator } from "./StackNavigator";
import i18n from "i18n-js";
import "./translations";

const MyDrawerNavigation = createDrawerNavigator(
  {
    Home: {
      screen: StackNavigator,
      navigationOptions: {
        title: i18n.t("home")
      }
    },
    CameraPrediction: {
      screen: PredictFromCamera,
      navigationOptions: {
        title: i18n.t("picture")
      }
    },
    UploadImage: {
      screen: UploadImage,
      navigationOptions: {
        title: i18n.t("gallery")
      }
    },
    Quiz: { screen: QuizStackNavigator },
    Login: {
      screen: Login,
      navigationOptions: {
        title: i18n.t("logout")
      }
    }
  },
  {
    drawerPosition: "left",
    initialRouteName: "Home",
    drawerWidth: 200
  }
);

const AppContainer = createAppContainer(MyDrawerNavigation);

export default class DrawerNavigator extends React.Component {
  render() {
    return <AppContainer />;
  }
}
