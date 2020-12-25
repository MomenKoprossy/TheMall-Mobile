import React from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Block, Button, Input, Text, theme } from "galio-framework";

import { LinearGradient } from "expo-linear-gradient";
import { materialTheme } from "../constants/";
import { HeaderHeight } from "../constants/utils";
import * as firebase from "firebase";

const { height, width } = Dimensions.get("window");

export default class SignUp extends React.Component {
  state = {
    user: "",
    email: "",
    password: "",
    active: {
      user: false,
      email: false,
      password: false,
    },
  };

  registeruser() {
    var errors = "";
    var username = this.state.user;
    var useremail = this.state.email;
    var userpass = this.state.password;
    firebase
      .auth()
      .createUserWithEmailAndPassword(useremail, userpass)
      .then(() => {
        var uid = firebase.auth().currentUser.uid;
        console.log(uid);
        firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .set({ name: username, email: useremail })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            errors += `${errorCode}: ${errorMessage}`;
          });
        this.props.navigation.navigate("Palletk");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        errors += `${errorCode}: ${errorMessage}`;
      })
      .then(() => {
        if (errors != "") alert(errors);
        else alert("User Created Successfully!");
      });
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  toggleActive = (name) => {
    const { active } = this.state;
    active[name] = !active[name];

    this.setState({ active });
  };

  render() {
    const { navigation } = this.props;
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0.25, y: 1.1 }}
        locations={[0.2, 1]}
        colors={["#6C24AA", "#15002B"]}
        style={[styles.signup, { flex: 1, paddingTop: theme.SIZES.BASE * 4 }]}
      >
        <Block flex middle>
          <KeyboardAvoidingView behavior="padding" enabled>
            <Block flex={1} marginTop="50%" center space="between">
              <Block center>
                <Input
                  bgColor="transparent"
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  borderless
                  color="white"
                  placeholder="Name"
                  autoCapitalize="none"
                  style={[
                    styles.input,
                    this.state.active.email ? styles.inputActive : null,
                  ]}
                  onChangeText={(text) => this.handleChange("user", text)}
                  onBlur={() => this.toggleActive("user")}
                  onFocus={() => this.toggleActive("user")}
                />
                <Input
                  bgColor="transparent"
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  borderless
                  color="white"
                  type="email-address"
                  placeholder="Email"
                  autoCapitalize="none"
                  style={[
                    styles.input,
                    this.state.active.email ? styles.inputActive : null,
                  ]}
                  onChangeText={(text) => this.handleChange("email", text)}
                  onBlur={() => this.toggleActive("email")}
                  onFocus={() => this.toggleActive("email")}
                />
                <Input
                  bgColor="transparent"
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  borderless
                  color="white"
                  password
                  viewPass
                  placeholder="Password"
                  iconColor="white"
                  style={[
                    styles.input,
                    this.state.active.password ? styles.inputActive : null,
                  ]}
                  onChangeText={(text) => this.handleChange("password", text)}
                  onBlur={() => this.toggleActive("password")}
                  onFocus={() => this.toggleActive("password")}
                />
              </Block>
              <Block flex top style={{ marginTop: 20 }}>
                <Button
                  shadowless
                  style={{ height: 48 }}
                  color={materialTheme.COLORS.BUTTON_COLOR}
                  onPress={() => {
                    this.registeruser();
                  }}
                >
                  SIGN UP
                </Button>
                <Button
                  color="transparent"
                  shadowless
                  onPress={() => navigation.navigate("Sign In")}
                >
                  <Text
                    center
                    color={theme.COLORS.WHITE}
                    size={theme.SIZES.FONT * 0.75}
                  >
                    Already have an account? Sign In
                  </Text>
                </Button>
              </Block>
            </Block>
          </KeyboardAvoidingView>
        </Block>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  signup: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
  },
  input: {
    width: width * 0.9,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  inputActive: {
    borderBottomColor: "white",
  },
});
