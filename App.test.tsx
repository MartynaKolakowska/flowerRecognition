import React from "react";
import renderer from "react-test-renderer";
import Homepage from "./components/Homepage";
import SignUp from "./components/register/signUp";
import Quiz from "./components/quiz/quiz";
import UploadImage from "./components/uploadImage";
import PredictFromCamera from "./components/cameraPrediction";
import AboutFlower from "./components/aboutFlower";
import QuizResults from "./components/quiz/quizResult";
import { Provider } from "mobx-react";
import observableStore from "./store";
import PredictionResult from "./components/predictionResult";

describe("<Homepage />", () => {
  it("is renders Homepage correctly", () => {
    const tree = renderer.create(<Homepage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("<SignUp />", () => {
  it("is renders SignUp correctly", () => {
    const tree = renderer.create(<SignUp />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("<Quiz />", () => {
  it("is renders Quiz correctly", () => {
    const tree = renderer
      .create(
        <Provider observableStore={observableStore}>
          <Quiz />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("<UploadImage />", () => {
  it("is renders UploadImage correctly", () => {
    const tree = renderer
      .create(
        <Provider observableStore={observableStore}>
          <UploadImage />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("<PredictFromCamera />", () => {
  it("is renders PredictFromCamera correctly", () => {
    const tree = renderer
      .create(
        <Provider observableStore={observableStore}>
          <PredictFromCamera />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("<AboutFlower />", () => {
  it("is renders AboutFlower correctly", () => {
    const tree = renderer
      .create(
        <Provider observableStore={observableStore}>
          <PredictFromCamera />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("<QuizResult />", () => {
  it("is renders QuizResult correctly", () => {
    const tree = renderer
      .create(
        <Provider observableStore={observableStore}>
          <QuizResults />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("<PredictionResult />", () => {
  it("is renders PredictionResult correctly", () => {
    const tree = renderer
      .create(
        <Provider observableStore={observableStore}>
          <PredictionResult />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
