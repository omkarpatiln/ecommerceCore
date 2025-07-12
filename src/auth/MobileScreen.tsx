import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useRef, useState } from 'react';
import auth from '@react-native-firebase/auth';

import LinearGradient from 'react-native-linear-gradient';

import { StackAuthProps } from './AuthRoutes';

import { Colors, Fonts, Sizes } from '../Modules/ThemHelper';
import GenealScreen from './Components/GenealScreen';
import Toast from '../Components/Toast';
import TextInput from './Components/TextInput';
import TextButton from './Components/TextButton';
const IMAGE_WIDTH = 250;

type Props = StackAuthProps<'MobileScreen'>;

const MobileScreen: React.FC<Props> = ({ navigation, route }) => {
  const [confirmation, setConfirmation] = useState(null);
  const [otp, setOtp] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [requestSent, setRequestSent] = useState(false);
  const recaptchaVerifier = useRef(null);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.Black }}>
      <GenealScreen
        onBack={() => {
          navigation.goBack();
        }}
        label="Login Using Mobile Number"
      />
      <View style={{ height: Sizes.ScreenPadding * 2 }} />
      <View style={{ flex: 1, marginHorizontal: Sizes.ScreenPadding }}>
        <View>
          <TextInput
            style={{
              backgroundColor: Colors.LightBlack,
              alignSelf: 'center',
              marginTop: Sizes.ScreenPadding,
              borderRadius: Sizes.Base,
              minHeight: 45,
            }}
            placeholder="Your Mobile number *"
            value={mobileNumber}
            textStyle={{ color: Colors.White }}
            onChangeText={text => {
              setMobileNumber(text);
            }}
            keyboardType="number-pad"
          />
          <View style={{ height: Sizes.ScreenPadding * 2 }} />
          <TextButton
            label="SEND OTP"
            loading={false}
            onPress={() => {}}
            colors={[Colors.YellowButton, Colors.YellowButton]}
            textStyle={{ fontWeight: '800', color: Colors.Black }}
          />
          <View style={{ height: 50 }} />
        </View>

        <View style={{ height: Sizes.ScreenPadding * 2 }} />
      </View>
    </View>
  );
};

export default MobileScreen;
