import * as React from "react";
import {
  createStackNavigator,
  createAppContainer,
  DrawerActions
} from "react-navigation";
import HomeScreen from "./components/Homepage";
import PredictFromCamera from "./components/cameraPrediction";
import UploadImage from "./components/uploadImage";
import Login from "./components/login";
import SignUp from "./components/signUp";
import Loading from "./components/loading";
import FlowersList from "./components/flowersList";
import PredicitonResult from "./components/predictionResult";
import AboutFlower from "./components/aboutFlower";

const MyStackNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    CameraPrediction: { screen: PredictFromCamera },
    UploadImage: { screen: UploadImage },
    PredicitonResult: { screen: PredicitonResult },
    FlowersList: { screen: FlowersList },
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    Loading: { screen: Loading },
    AboutFlower: { screen: AboutFlower }
  },
  {
    initialRouteName: "Loading",
    defaultNavigationOptions: {
      headerStyle: { height: 55, backgroundColor: "#7ba9a9" },
      headerTitleStyle: { fontWeight: "bold", color: "#192e2f" }
    }
  }
);

const AppContainer = createAppContainer(MyStackNavigator);

export default class StackNavigator extends React.Component<any> {
  render() {
    return (
      <AppContainer
        screenProps={{
          openDraw: () =>
            this.props.navigation.dispatch(DrawerActions.openDrawer())
        }}
      />
    );
  }
}
