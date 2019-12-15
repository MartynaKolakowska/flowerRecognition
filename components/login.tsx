import * as React from "react";
import { firebase } from "../config";
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
      <Text>Log in</Text>
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
        placeholder='Password'
        autoCapitalize='none'
        style={styles.textInput}
        onChangeText={password => setPassword(password)}
        value={password}
      />
      <Button title='Log in' onPress={handleLogin} />
      <Button
        title="Don't have an account? Sign in"
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
  title: "Log in"
} as NavigationScreenOptions;

export default Login;
