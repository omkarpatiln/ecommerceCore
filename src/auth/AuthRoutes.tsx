import { NavigationContainer } from '@react-navigation/native';
import React, { JSX, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Login from './Login';
import Registration from './Registration';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import MobileScreen from './MobileScreen';
import OtpScreen from './OtpScreen';
import { createStackNavigator } from '@react-navigation/stack';

export type StackParams = {
  Login: undefined;
  MobileScreen: undefined;
  SchoolRegistration: undefined;
  OtpScreen: {
    Mobile: number;
    Confirmation: FirebaseAuthTypes.ConfirmationResult;
  };
  Registration: undefined;
  AppRegistrationScreen: {
    item: undefined;
  };
  TeacherStudentRegistration: {
    item: undefined;
  };
};
const stack = createStackNavigator<StackParams>();

export type StackAuthProps<ScreenName extends keyof StackParams> =
  NativeStackScreenProps<StackParams, ScreenName>;

const AuthRoutes = (): JSX.Element => {
  return (
    <NavigationContainer>
      <stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <stack.Screen name="Login" component={Login} />
        <stack.Screen name="MobileScreen" component={MobileScreen} />
        <stack.Screen name="Registration" component={Registration} />
        <stack.Screen name="OtpScreen" component={OtpScreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthRoutes;
