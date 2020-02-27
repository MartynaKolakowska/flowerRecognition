import * as React from "react";
import {
  createStackNavigator,
  createAppContainer,
  DrawerActions
} from "react-navigation";
import HomeScreen from "./components/Homepage";
import PredictFromCamera from "./components/cameraPrediction";
import UploadImage from "./components/uploadImage";
import Login from "./components/register/login";
import SignUp from "./components/register/signUp";
import Loading from "./components/loading";
import PredicitonResult from "./components/predictionResult";
import AboutFlower from "./components/aboutFlower";
import Quiz from "./components/quiz/quiz";
import QuizResult from "./components/quiz/quizResult";
import i18n from "i18n-js";
import "./translations";

export const QuizStackNavigator = createStackNavigator(
  {
    Quiz: {
      screen: Quiz
    },
    QuizResult: { screen: QuizResult }
  },
  {
    initialRouteName: "Quiz",
    defaultNavigationOptions: {
      title: i18n.t("quizResults"),
      headerStyle: { height: 55, backgroundColor: "#7ba9a9" },
      headerTitleStyle: { fontWeight: "bold", color: "#192e2f" }
    }
  }
);

const MyStackNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    CameraPrediction: { screen: PredictFromCamera },
    UploadImage: { screen: UploadImage },
    PredicitonResult: { screen: PredicitonResult },
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    Loading: { screen: Loading },
    AboutFlower: { screen: AboutFlower },
    Quiz: QuizStackNavigator
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
