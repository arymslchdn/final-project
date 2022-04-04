import React from "react";
import { StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import ProfileDetails from './src/screens/ProfileDetails';
import Course from './src/screens/Course';
import Lecture from './src/screens/Lecture';
import ChangePassword from './src/screens/ChangePassword';

import { LogBox } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={ Home } />
        <Stack.Screen name="ProfileDetails" component= {ProfileDetails} />
        <Stack.Screen name="Course" component={Course} />
        <Stack.Screen name="Lecture" component={Lecture} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
