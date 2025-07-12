import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  AppState,
} from 'react-native';
import React, { JSX, useEffect, useState } from 'react';

import { StackAuthProps } from './AuthRoutes';

import LinearGradient from 'react-native-linear-gradient';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Colors, Fonts, Sizes } from '../Modules/ThemHelper';
import GenealScreen from './Components/GenealScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Modal from '../Components/Modal';
import TextButton from './Components/TextButton';
import TextInput from './Components/TextInput';
import Icon from '../Components/Icon';
import Spacing from '../Components/Spacing';
import Toast from '../Components/Toast';
import {
  createCustomOneDocument,
  getSpecificDocumentData,
} from '../Firebase/FirebaseServices';
import { doc, setDoc } from '@firebase/firestore';
import { db } from '../Firebase/firebase.config';
import moment from 'moment';
import { setUser } from '../Redux/Slices/userSlice';
import { MAIN_PROFILE_DATA } from '../Modules/interface';
import { useDispatch } from 'react-redux';

type Props = StackAuthProps<'Registration'>;
const IMAGE_WIDTH = 180;

const Registration = ({ navigation, route }: Props): JSX.Element => {
  const [selectedCountry, setSelectedCountry] = useState({
    value: '91',
    label: '+91',
  });
  const [userLogin, setUserLogin] = useState({
    EMAIL: '',
    MOBILE: '',
    NAME: '',
    Password: '',
    Loading: false,
    error: '',
    ShowPass1: false,
    ShowPass2: false,
    ConfirmPassword: '',
  });
  const dispatch = useDispatch();

  const [verificationModal, setVerificationModal] = useState(false);

  const checkValidation = () => {
    const { MOBILE, Password, NAME } = userLogin;

    if (!NAME.trim()) {
      Toast('Please Enter Name');
      return false;
    }
    if (!MOBILE.trim()) {
      Toast('Mobile Number is Required');
      return false;
    }

    if (!Password.trim()) {
      Toast('Please Enter Password');

      return false;
    }
    if (!Password.trim()) {
      Toast('Please Enter Confirm Password');

      return false;
    }
    if (userLogin.ConfirmPassword != userLogin.Password) {
      Toast('Confirm Password Dose not Match');

      return false;
    }
  };
  const registration = async () => {
    if (checkValidation()) {
      return;
    }

    try {
      setUserLogin({ ...userLogin, Loading: true });
      let res = await getSpecificDocumentData('Users', userLogin.MOBILE);
      if (res) {
        Toast('Account Already Exists');
        setUserLogin({ ...userLogin, Loading: false });
      } else {
        SignUpUser();
      }
    } catch (error) {
      console.log('Error occurred:', error);
    }
  };

  const SignUpUser = async () => {
    try {
      const data: MAIN_PROFILE_DATA = {
        NAME: userLogin.NAME,
        MOBILE_NUMBER: userLogin.MOBILE,
        PASSWORD: userLogin.Password,
        EMAIL_ID: '',
        SECURITY_PIN: '',
        POINTS: 0,
        ID: '',
        IS_ID: false,
        IS_ACTIVE: true,
        REGISTERED_DATE: moment().format('DD-MM-YYYY'),
        LAST_SEEN: moment().format('DD-MM-YYYY'),
        MESSAGE_TEXT: '',
        ReferCode: 0,
        UserEnteredReferCode: '',
        PROFILE_PIC: '',
      };
      const res = await createCustomOneDocument(
        'Users',
        userLogin.MOBILE,
        data,
      );

      console.warn('Registration Successful');

      try {
        await AsyncStorage.setItem('MobileNumber', userLogin.MOBILE);
        dispatch(setUser(data));
      } catch (error) {
        console.error('Error saving user number:', error);
      }
    } catch (error) {
      console.log(error);
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
      <Modal
        isVisible={verificationModal}
        style={{
          height: Sizes.Height / 2,
          margin: Sizes.Padding,
          backgroundColor: Colors.Black,
        }}
        onClose={() => {}}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.Black,
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              ...Fonts.B1,
              fontWeight: '700',
              fontSize: 32,
              textAlign: 'center',
              color: Colors.White,
            }}
          >{`Please Verify Email to Continue.`}</Text>
          <View style={{ height: 20 }} />
          <View style={{}}>
            <Text
              style={{
                ...Fonts.M1,
                color: Colors.White,
                textAlign: 'center',
              }}
            >{`Don't Receive verification email?`}</Text>
            <Text
              style={{
                ...Fonts.B1,
                color: Colors.White,
                textAlign: 'center',
              }}
            >{`Send Again`}</Text>
          </View>
          <View style={{ height: 20 }} />

          <TextButton label="Log Out" onPress={() => {}} loading={false} />
          <View style={{ height: 20 }} />
          <TextButton
            label="I HAVE VERIFIED"
            onPress={() => {}}
            loading={false}
          />
        </View>
      </Modal>
      <ScrollView
        style={{
          flex: 1,
          width: '100%',
        }}
      >
        <View style={{ flex: 1, alignItems: 'center' }}>
          <GenealScreen
            onBack={() => {
              navigation.goBack();
            }}
            label="Register Your Account"
          />

          <View style={{ height: 20 }} />

          <View style={{}}>
            <TextInput
              style={{
                width: '90%',
                borderRadius: Sizes.Base,
                backgroundColor: Colors.LightBlack,
                elevation: 0,
                minHeight: 45,
              }}
              onChangeText={(value: string) => {
                const newValue = value.replace(/\s/g, '');
                setUserLogin({ ...userLogin, NAME: newValue });
              }}
              textStyle={{ color: Colors.White }}
              value={userLogin.NAME}
              placeholder={'Name *'}
              autoFocus={true}
            />
            <View style={{ height: 20 }} />

            <TextInput
              style={{
                width: '90%',
                borderRadius: Sizes.Base,
                backgroundColor: Colors.LightBlack,
                elevation: 0,
                minHeight: 45,
              }}
              keyboardType={'number-pad'}
              onChangeText={(value: string) => {
                const newValue = value.replace(/\s/g, '');
                setUserLogin({ ...userLogin, MOBILE: newValue });
              }}
              textStyle={{ color: Colors.White }}
              value={userLogin.MOBILE}
              placeholder={'Mobile Number *'}
              autoFocus={true}
            />

            <View style={{ height: 20 }} />
            <TextInput
              style={{
                width: '90%',
                borderRadius: Sizes.Base,
                backgroundColor: Colors.LightBlack,
                elevation: 0,
                minHeight: 45,
              }}
              textStyle={{ color: Colors.White }}
              hidden={!userLogin.ShowPass1}
              onChangeText={(value: string) => {
                const newValue = value.replace(/\s/g, '');
                setUserLogin({ ...userLogin, Password: newValue });
              }}
              autoFocus={false}
              rightChild={
                <Icon
                  onPress={() => {
                    setUserLogin({
                      ...userLogin,
                      ShowPass1: !userLogin.ShowPass1,
                    });
                  }}
                  style={{ marginEnd: Sizes.Padding }}
                  type="Entypo"
                  name={userLogin.ShowPass1 ? 'eye' : 'eye-with-line'}
                  color={Colors.Primary}
                />
              }
              value={userLogin.Password}
              placeholder={'Your Password *'}
            />
            <View style={{ height: 30 }} />

            <TextInput
              style={{
                width: '90%',
                borderRadius: Sizes.Base,
                backgroundColor: Colors.LightBlack,
                elevation: 0,
                minHeight: 45,
              }}
              textStyle={{ color: Colors.White }}
              autoFocus={false}
              hidden={!userLogin.ShowPass2}
              onChangeText={(value: string) => {
                const newValue = value.replace(/\s/g, '');
                setUserLogin({ ...userLogin, ConfirmPassword: newValue });
              }}
              rightChild={
                <Icon
                  onPress={() => {
                    setUserLogin({
                      ...userLogin,
                      ShowPass2: !userLogin.ShowPass2,
                    });
                  }}
                  style={{ marginEnd: Sizes.Padding }}
                  type="Entypo"
                  color={Colors.Primary}
                  name={userLogin.ShowPass2 ? 'eye' : 'eye-with-line'}
                />
              }
              value={userLogin.ConfirmPassword}
              placeholder={'Confirm Your Password *'}
            />
            <View style={{ height: 30 }} />

            <View style={{ height: 50 }}>
              <TextButton
                label="SIGN UP"
                loading={userLogin.Loading}
                onPress={() => {
                  registration();
                }}
                textStyle={{ color: Colors.Black, fontWeight: '800' }}
                colors={[Colors.Primary, Colors.Primary]}
                LinearGradientStyle={{ borderRadius: Sizes.Padding }}
                style={{ borderRadius: Sizes.Padding }}
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
              >{`Already have an account? `}</Text>
              <Text
                onPress={() => {
                  navigation.goBack();
                }}
                style={{
                  ...Fonts.B1,
                  color: Colors.Primary,
                  fontSize: 16,
                  fontWeight: '800',
                }}
              >{`Login`}</Text>
            </View>

            <View style={{ height: Sizes.ScreenPadding * 2 }} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Registration;
