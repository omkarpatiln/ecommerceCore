import React, { JSX, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput as TI,
  Keyboard,
  NativeModules,
  TouchableOpacity,
  ScrollView,
  AppState,
} from 'react-native';

import { StackAuthProps } from './AuthRoutes';

import GenealScreen from './Components/GenealScreen';
import { Colors, Fonts, Sizes } from '../Modules/ThemHelper';
import Spacing from '../Components/Spacing';
import Modal from '../Components/Modal';
import TextButton from './Components/TextButton';
import TextInput from './Components/TextInput';
import Icon from '../Components/Icon';
import { getSpecificDocumentData } from '../Firebase/FirebaseServices';
import Toast from '../Components/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/Slices/userSlice';
import { MAIN_PROFILE_DATA } from '../Modules/interface';
type Props = StackAuthProps<'Login'>;
const Login = ({ navigation }: Props): JSX.Element => {
  const [ForgetPassword, setForgetPassword] = useState(false);

  const [userLogin, setUserLogin] = useState({
    EMAIL: '',
    Password: '',
    Loading: false,
    error: '',
    ShowPass: false,
    MOBILE: '',
  });
  const dispatch = useDispatch();

  const checkValidation: () => Promise<boolean> = async () => {
    console.log('userLogin.MOBILE', userLogin.MOBILE);
    if (userLogin.MOBILE == '') {
      Toast('Please Enter Mobile Number');
      return true;
    } else if (userLogin.Password.trim() == '') {
      Toast('Please Enter Password');
      return true;
    } else {
      return false;
    }
  };
  const onLogin = async () => {
    const stat = await checkValidation();
    if (stat) {
      return false;
    } else {
      setUserLogin({ ...userLogin, Loading: true });
      let res = await getSpecificDocumentData('Users', userLogin.MOBILE);
      if (res) {
        console.log('res', res);
        setUserLogin({ ...userLogin, Loading: false });

        if (res.PASSWORD == userLogin.Password) {
          await AsyncStorage.setItem('MobileNumber', userLogin.MOBILE);
          dispatch(setUser(res as MAIN_PROFILE_DATA));
          const Mobile_Number = await AsyncStorage.setItem(
            'MobileNumber',
            userLogin.MOBILE,
          );

          Toast('Login Successfully');
        } else {
          Toast('Wrong Password');
        }
      }
      setUserLogin({ ...userLogin, Loading: false });
    }
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.Black,
      }}
    >
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}
        >
          <GenealScreen label="Login Your Account" />
          <View style={{ height: 30 }} />

          <View style={{}}>
            <View style={{ width: '100%' }}>
              <TextInput
                style={{
                  width: '90%',
                  borderRadius: Sizes.Base,
                  backgroundColor: Colors.LightBlack,
                  elevation: 0,
                  minHeight: 40,
                }}
                autoFocus={true}
                imp
                keyboardType={'number-pad'}
                onChangeText={(value: string) => {
                  setUserLogin({ ...userLogin, MOBILE: value });
                }}
                textStyle={{ color: Colors.White }}
                value={userLogin.MOBILE}
                placeholder={'Mobile *'}
              />
            </View>

            <View style={{ height: 30 }} />
            <TextInput
              style={{
                width: '90%',
                borderRadius: Sizes.Base,
                backgroundColor: Colors.LightBlack,
                elevation: 0,
                minHeight: 40,
              }}
              autoFocus={false}
              textStyle={{ color: Colors.White }}
              hidden={!userLogin.ShowPass}
              onChangeText={(value: string) => {
                const newValue = value.replace(/\s/g, '');
                setUserLogin({ ...userLogin, Password: newValue });
              }}
              rightChild={
                <Icon
                  onPress={() => {
                    setUserLogin({
                      ...userLogin,
                      ShowPass: !userLogin.ShowPass,
                    });
                  }}
                  style={{ marginEnd: Sizes.Padding }}
                  type="Entypo"
                  color={Colors.Primary}
                  name={userLogin.ShowPass ? 'eye' : 'eye-with-line'}
                />
              }
              value={userLogin.Password}
              placeholder={'Your Password *'}
            />
            <View style={{ height: 30 }} />
            <Text
              onPress={() => {
                setForgetPassword(true);
              }}
              style={{
                ...Fonts.B1,
                color: Colors.White,
                fontSize: 14,
                textAlign: 'right',
              }}
            >
              {'Forgot Password'}
            </Text>
            <View style={{ height: 30 }} />

            <View style={{ height: 50 }}>
              <TextButton
                label="LOG IN NOW"
                loading={userLogin.Loading}
                onPress={() => {
                  onLogin();
                }}
                colors={[Colors.Primary, Colors.Primary]}
                LinearGradientStyle={{ borderRadius: Sizes.Padding }}
                style={{ borderRadius: Sizes.Padding }}
                textStyle={{ color: Colors.Black, fontWeight: '800' }}
              />
            </View>
            <View style={{ height: 30 }} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  ...Fonts.B1,
                  color: Colors.White,
                  fontSize: 16,
                  fontWeight: '800',
                }}
              >{` Don't have an Account ? `}</Text>
              <Text
                onPress={() => {
                  navigation.navigate('Registration');
                }}
                style={{
                  ...Fonts.B1,
                  color: Colors.Primary,
                  fontSize: 16,
                  fontWeight: '800',
                }}
              >{`Register Now`}</Text>
            </View>
            <View style={{ height: 30 }} />

            <View style={{ height: Sizes.ScreenPadding * 2 }} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default Login;
