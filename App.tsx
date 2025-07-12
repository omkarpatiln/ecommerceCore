import { View, Text } from 'react-native';
import React from 'react';
import Routes from './src/Routes';
import AuthRoutes from './src/auth/AuthRoutes';
import { useSelector } from 'react-redux';
import { RootState } from './src/Redux';
import SplashScreen from './src/Screens/Home/SplashScreen';

const App = () => {
  const { user, ShowSplash } = useSelector((state: RootState) => state.user);

  console.log('user', user);

  if (ShowSplash) {
    return <SplashScreen />;
  } else if (user) {
    return <Routes />;
  } else {
    return <AuthRoutes />;
  }
};

export default App;
