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

const SignUp = props => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState(null);
  const db = firebase.firestore();
  let usersRef = db.collection("users");
  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => props.navigation.navigate("Home"))
      .catch(error => setErrorMessage(error.message));

    usersRef
      .where("username", "==", username)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);
        } else {
          throw new Error("username is already taken");
        }
      })
      .then(createdUser => {
        console.log(createdUser);
        db.collection("users")
          .doc(createdUser.user.uid)
          .set({ username: username });
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };
  return (
    <View style={styles.container}>
      <Text>Sign up</Text>
      {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
      <TextInput
        placeholder='Username'
        autoCapitalize='none'
        style={styles.textInput}
        onChangeText={username => setUsername(username)}
        value={username}
      />
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
      <Button title='Sign Up' onPress={handleSignUp} />
      <Button
        title='Already have an account? Log in'
        onPress={() => props.navigation.navigate("Login")}
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

export default SignUp;
