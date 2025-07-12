import { View, Text, Image, StyleSheet } from 'react-native';
import React, { JSX, use, useEffect, useState } from 'react';

import { StackAuthProps } from './AuthRoutes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Colors, Fonts, Sizes } from '../Modules/ThemHelper';
import GenealScreen from './Components/GenealScreen';
import Toast from '../Components/Toast';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import TextButton from './Components/TextButton';

const IMAGE_WIDTH = 180;

type Props = StackAuthProps<'OtpScreen'>;
const OtpScreen = ({ navigation, route }: Props): JSX.Element => {
  const { Mobile, Confirmation } = route.params;

  const [otp, setOtp] = useState({
    otp: '',
    loading: false,
  });
  const [timer, setTimer] = useState(30);
  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <View style={styles.container}>
      <GenealScreen
        onBack={() => {
          navigation.goBack();
        }}
        label="Enter OTP To Login"
      />

      <View style={styles.loginBox}>
        <View style={styles.mobileContainer}>
          <Text style={styles.mobileText}>{Mobile}</Text>
        </View>

        <OTPInputView
          editable={!otp.loading}
          keyboardType="number-pad"
          style={styles.otpContainer}
          pinCount={6}
          autoFocusOnLoad
          codeInputFieldStyle={styles.codeInputField}
          codeInputHighlightStyle={styles.codeInputHighlight}
          onCodeFilled={value => {
            setOtp({ ...otp, otp: value, loading: true });
          }}
          onCodeChanged={value => {
            setOtp({ ...otp, otp: value });
          }}
        />

        <View>
          <TextButton
            onPress={() => {}}
            loading={false}
            label="VERIFY"
            colors={[Colors.YellowButton, Colors.YellowButton]}
            style={styles.verifyButton}
            textStyle={{ color: Colors.Black, fontWeight: '800' }}
          />
        </View>

        <Text
          disabled={timer > 0}
          style={styles.resendOtpText}
          onPress={() => {
            setOtp({ ...otp, otp: '' });
            setTimer(30);
          }}
        >
          {timer > 0 ? `Resend OTP(${timer})` : 'Resend OTP'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Black,
  },
  loginBox: {
    marginTop: 10,
    marginHorizontal: Sizes.ScreenPadding,
    elevation: 10,
    backgroundColor: Colors.LightGray,
    padding: Sizes.ScreenPadding,
    borderRadius: Sizes.ScreenPadding,
  },
  mobileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mobileText: {
    color: Colors.White,
    // ...Fonts.B2,
    fontWeight: '400',
    fontSize: 18,
  },
  editIcon: {
    marginLeft: Sizes.Radius,
  },
  otpContainer: {
    height: 50,
  },
  codeInputField: {
    width: 40,
    height: 50,
    borderWidth: 0,
    borderColor: Colors.GrayBorder,
    color: Colors.PrimaryText,
    ...Fonts.M2,
    borderBottomWidth: 1,
  },
  codeInputHighlight: {
    borderColor: Colors.White,
  },
  verifyButton: {
    marginTop: Sizes.ScreenPadding,
    color: Colors.Disable,
  },
  resendOtpText: {
    ...Fonts.R3,
    fontSize: 14,
    marginTop: Sizes.Radius,
    color: Colors.White,
    textAlign: 'right',
    justifyContent: 'flex-end',
  },
});

export default OtpScreen;
