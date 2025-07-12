import {
  createStaticNavigation,
  NavigationContainer,
} from '@react-navigation/native';
import React, { JSX } from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Home from './Screens/Home/Home';
import ProductDetails from './Screens/ProductDetails/ProductDetails';
import { Products } from './Modules/interface';
import AddToCart from './Screens/AddToCart/AddToCart';

export type StackParams = {
  Home: undefined;
  AddToCart: undefined;
  ProductDetails: { Item: Products };
};
const stack = createNativeStackNavigator<StackParams>();

export type StackProps<ScreenName extends keyof StackParams> =
  NativeStackScreenProps<StackParams, ScreenName>;

const Routes = (): JSX.Element => {
  return (
    <NavigationContainer>
      <stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <stack.Screen name="Home" component={Home} />
        <stack.Screen name="ProductDetails" component={ProductDetails} />
        <stack.Screen name="AddToCart" component={AddToCart} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
