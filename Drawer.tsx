import * as React from "react";
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./components/Homepage";
import PredictFromCamera from "./components/cameraPrediction";
import UploadImage from "./components/uploadImage";
import Login from "./components/login";
import SignUp from "./components/signUp";
import Loading from "./components/loading";
import FlowersList from "./components/flowersList";
import StackNavigator from "./StackNavigator";

const MyDrawerNavigation = createDrawerNavigator(
  {
    Home: {
      screen: StackNavigator,
      navigationOptions: {
        title: "Home"
      }
    },
    CameraPrediction: {
      screen: PredictFromCamera,
      navigationOptions: {
        title: "Take a picture"
      }
    },
    UploadImage: {
      screen: UploadImage,
      navigationOptions: {
        title: "Upload a picture"
      }
    },
    FlowersList: {
      screen: FlowersList,
      navigationOptions: {
        title: "Notifications"
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        title: "Login"
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
