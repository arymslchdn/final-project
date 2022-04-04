import React, { Component } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { theme } from "../core/theme";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { LinearGradient } from "expo-linear-gradient";
import { Loginhead } from "../components/Loginhead";
import global from '../global';
import signIn from '../api/signIn';
import saveToken from '../api/saveToken';
import getToken from '../api/getToken';
import getUserLogged from "../api/getUserLogged";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    getToken()
    .then(token => getUserLogged(token))
    .then(res => this.redirectToMain(res))
    .catch(err => console.log(err));
  }

  redirectToMain(res) {
      if(res.email) {
          global.onSignIn = res;
          this.props.navigation.navigate("Home")
      }
  }

  gotoMain() {
      this.props.navigation.navigate("Home")
  }

  gotoRegister() {
      this.props.navigation.navigate("Register")
  }

  onSuccess() {
    Alert.alert(
        'Notifications',
        'successful',
        [
            { text: 'OK' }
        ],
        { cancelable: false }
    );
  }

  onFail() {
      Alert.alert('Notifications', 'Login failed', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          { text: 'OK'},
      ]);
  }

  onSignIn() {
    const { email, password } = this.state;
    signIn(email, password)
    .then(res => {
      if(res.user) {
        global.onSignIn = res.user;
        saveToken(res.access_token);
        this.onSuccess();
        this.gotoMain();
      } else {
        console.log(res)
        this.onFail();
      }
    })
    .catch(err => {
      console.log(err)
      this.onFail();
    });
  }

  render() {
    const { email, password } = this.state;
    return (
      <View styles={styles.container}>
        <View style={styles.head}>
          <Loginhead />
        </View>
        <View style={styles.body}>
          <View style={styles.rect}>
            <TextInput
              placeholder="Email"
              textBreakStrategy="highQuality"
              keyboardType="email-address"
              style={styles.textInput}
              onChangeText={(text) => this.setState({ email: text })}
              color="#000"
            ></TextInput>
          </View>
          <View style={styles.rect}>
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={(text) => this.setState({ password: text })}
              color="#000"
            ></TextInput>
          </View>
        </View>

        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={this.onSignIn.bind(this)}
          >
            <LinearGradient
              colors={["#164774", "#164774", "#164774"]}
              style={styles.button}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: responsiveFontSize(1.5),
                }}
              >
                LOG IN
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.row}>
            <Text>No account?</Text>
            <TouchableOpacity
              onPress={this.gotoRegister.bind(this)}
            >
              <Text style={styles.link}> Register now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: responsiveWidth(5),
    height: responsiveHeight(100),
  },

  head: { marginTop: responsiveHeight(10), marginLeft: responsiveWidth(2.5) },

  body: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: responsiveHeight(16),
  },

  footerContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop: responsiveHeight(10),
  },

  rect: {
    width: responsiveWidth(90),
    height: 48,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingLeft: responsiveWidth(3.5),
  },

  textInput: {
    color: "#000",
    height: 48,
    textAlign: "left",
    width: responsiveWidth(77.2),
    height: responsiveHeight(7),
    fontSize: responsiveFontSize(2),
    paddingLeft: responsiveWidth(3),
  },

  textButton: {
    color: "#000",
    fontSize: responsiveFontSize(2),
  },

  textNav: {
    color: theme.colors.text,
    alignSelf: "center",
  },

  button: {
    backgroundColor: "#743fcd",
    borderRadius: 40,
    width: responsiveWidth(35),
    height: responsiveHeight(5),
    paddingTop: 10,
    marginTop: responsiveHeight(3),
    marginLeft: responsiveWidth(2),
    alignSelf: "center",
  },

  row: {
    flexDirection: "row",
    marginTop: responsiveHeight(2.5),
    alignSelf: "center",
  },
  link: {
    fontWeight: "bold",
    color: "#164774",
  },
});
