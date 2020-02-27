import React from "react";
import { View, StyleSheet, StatusBar, Text, SafeAreaView } from "react-native";
import { inject, observer } from "mobx-react";
import { Button, ButtonContainer } from "./button";
import { Alert } from "./alert";
import { Icon } from "native-base";
import { BackHandler } from "react-native";
import i18n from "i18n-js";
import "../../translations";
import CountdownCircle from "react-native-countdown-circle";

interface State {
  correctCount?: number;
  totalCount?: number;
  activeQuestionIndex?: number;
  answered?: boolean;
  answerCorrect?: boolean;
  isReady?: boolean;
  questions?: any;
  timer?: number;
}

class Quiz extends React.Component<any> {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("Quiz"),
    headerLeft: (
      <Icon
        onPress={() => navigation.openDrawer()}
        name='menu'
        style={{ fontSize: 32, color: "#192e2f", marginLeft: 20 }}
      />
    )
  });
  state: State = {
    correctCount: 0,
    totalCount: 0,
    activeQuestionIndex: 0,
    answered: false,
    answerCorrect: false,
    isReady: false,
    questions: [],
    timer: 10
  };
  clockCall: NodeJS.Timeout;

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
  componentDidMount() {
    this.setState({
      questions: this.props.observableStore.store.questions,
      totalCount: this.props.observableStore.store.questions.length
    });
  }

  UNSAFE_componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    clearInterval(this.clockCall);
  }

  startTimer = () => {
    this.clockCall = setInterval(() => {
      this.decrementClock();
    }, 1000);
  };

  decrementClock = () => {
    if (this.state.timer === 0) {
      this.setState({ timer: 10 });
      clearInterval(this.clockCall);
      this.nextQuestion();
    }
    this.setState((prevstate: State) => ({ timer: prevstate.timer - 1 }));
  };

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  answer = correct => {
    clearInterval(this.clockCall);
    this.setState(
      (state: State) => {
        const nextState: State = { answered: true };

        if (correct) {
          nextState.correctCount = state.correctCount + 1;
          nextState.answerCorrect = true;
        } else {
          nextState.answerCorrect = false;
        }

        return nextState;
      },
      () => {
        setTimeout(() => {
          this.setState({ timer: 10 });
          this.nextQuestion();
        }, 750);
      }
    );
  };

  nextQuestion = () => {
    this.startTimer();
    this.setState((state: State) => {
      const nextIndex = state.activeQuestionIndex + 1;
      if (nextIndex >= state.totalCount) {
        clearInterval(this.clockCall);
        this.props.observableStore.setScore(this.state.correctCount);
        this.props.navigation.navigate("QuizResult");
      }

      return {
        activeQuestionIndex: nextIndex,
        answered: false
      };
    });
  };

  render() {
    const questions = this.state.questions;
    const question = questions[this.state.activeQuestionIndex];

    if (!this.state.isReady) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>{i18n.t("quizButton")}</Text>
          <Button
            text={i18n.t("ready")}
            onPress={() => {
              this.setState({ isReady: true });
              this.startTimer();
            }}
          />
        </View>
      );
    } else
      return (
        <View style={[styles.container]}>
          <SafeAreaView style={styles.safearea}>
            <View>
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: 8
                }}>
                <CountdownCircle
                  seconds={this.state.timer}
                  radius={34}
                  borderWidth={8}
                  color='#7ba9a9'
                  bgColor='#fff'
                  textStyle={{ fontSize: 20 }}
                />
              </View>

              <Text style={styles.text}>{question && question.question}</Text>

              <ButtonContainer>
                {question &&
                  question.answers &&
                  question.answers.map(answer => (
                    <Button
                      key={answer.id}
                      text={answer.text}
                      onPress={() => this.answer(answer.correct)}
                    />
                  ))}
              </ButtonContainer>
            </View>
          </SafeAreaView>
          <Alert
            correct={this.state.answerCorrect}
            visible={this.state.answered}
          />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#385659",
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#e6e7e8",
    fontSize: 25,
    textAlign: "center",
    letterSpacing: -0.02,
    fontWeight: "600"
  },
  safearea: {
    flex: 1,
    marginTop: 100,
    justifyContent: "space-between"
  }
});

export default inject("observableStore")(observer(Quiz));
