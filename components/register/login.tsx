import * as React from "react";
import { firebase } from "../../config";
import {
  Button,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput
} from "react-native";
import {
  NavigationScreenComponent,
  NavigationScreenOptions
} from "react-navigation";
import i18n from "i18n-js";
import "../../translations";

const Login: NavigationScreenComponent = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState(null);
  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigation.navigate("Main"))
      .catch(error => setErrorMessage(error.message));
  };
  return (
    <View style={styles.container}>
      <Text>{i18n.t("login")}</Text>
      {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
      <TextInput
        placeholder='Email'
        autoCapitalize='none'
        style={styles.textInput}
        onChangeText={email => setEmail(email)}
        value={email}
      />
      <TextInput
        secureTextEntry
        placeholder={i18n.t("password")}
        autoCapitalize='none'
        style={styles.textInput}
        onChangeText={password => setPassword(password)}
        value={password}
      />
      <Button title={i18n.t("login")} onPress={handleLogin} />
      <Button
        title={i18n.t("noAccount")}
        onPress={() => navigation.navigate("SignUp")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8
  }
});

Login.navigationOptions = {
  title: i18n.t("login")
} as NavigationScreenOptions;

export default Login;
