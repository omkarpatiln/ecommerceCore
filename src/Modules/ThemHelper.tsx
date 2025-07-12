import { Dimensions, StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';
const isTablet = DeviceInfo.isTablet();

const Sizes = {
  ScreenPadding: 20,
  Padding: 14,
  Radius: 8,
  Base: 4,
  Width: Dimensions.get('screen').width,
  Height: Dimensions.get('screen').height,
  Scale: Dimensions.get('screen').fontScale,
  Header: isTablet ? 80 : 50,
  Field: 40,
  Margin: 10,
};
const Colors = {
  Primary: '#F39C12',
  Primary2: '#F39C12',
  Secondary: '#FF9374',
  Secondary2: '#FEDBDA',
  mixed: '#F3719B',
  White: '#FFFFFF',
  Black: '#000000',
  EditProfileDisable: '#939393',
  DeleteModalBackground: '#232524',
  YellowButton: '#DEF358',
  DeleteColor: '#B1B1B1',
  GrayBorder: '#878787CC',
  MediaCenter: '#333A35',
  LightBlack: '#343A36',
  TextGray: '#7E7E7E',
  LightGray: '#FFFFFF33',
  QuizGray: '#B5B5B5',
  CartQuiz: '#49504C',
  FilterBorders: '#6D6D6D',
  SearchBorder: '#737373',
  FilterModal: '#1E2620F2',

  text: '#3D3D3D',
  text2: '#494949',
  textColor: '#343434',
  PrimaryText: '#6A6A6A',
  PrimaryText1: '#9E9E9E',
  PrimaryText2: '#828282',
  Cancel: '#373737',
  Red: '#AA0000',
  Warning: '#D10000',
  Disable: '#9098B1',
  Background: '#FFFFFF',
  Rating: '#FFBB1D',
  TextDimGray: '#646464',
};
const Fonts = StyleSheet.create({
  B1: {
    fontFamily: 'Poppins-Bold',
    fontSize: isTablet ? 23 : 16,
    letterSpacing: 0.69,
  },
  B2: {
    fontFamily: 'Poppins-Bold',
    fontSize: isTablet ? 17 : 12,
    letterSpacing: 0.51,
  },
  B3: {
    fontFamily: 'Poppins-Bold',
    fontSize: isTablet ? 14 : 9,
    letterSpacing: 0.39,
  },
  M1: {
    fontFamily: 'Poppins-Medium',
    fontSize: isTablet ? 23 : 19,
    letterSpacing: 0.69,
  },
  M2: {
    fontFamily: 'Poppins-Medium',
    fontSize: isTablet ? 17 : 15,
    letterSpacing: 0.5,
  },
  M3: {
    fontFamily: 'Poppins-Medium',
    fontSize: isTablet ? 14 : 11,
    letterSpacing: 0.4,
  },
  R1: {
    fontFamily: 'Poppins-Regular',
    fontSize: isTablet ? 23 : 17,
    letterSpacing: 0.69,
  },
  R2: {
    fontFamily: 'Poppins-Regular',
    fontSize: isTablet ? 20 : 14,
    letterSpacing: 0.3,
  },
  R3: {
    fontFamily: 'Poppins-Regular',
    fontSize: isTablet ? 17 : 12,
    letterSpacing: 0.3,
  },

  R4: {
    fontFamily: 'Poppins-Regular',
    fontSize: isTablet ? 14 : 11,
    letterSpacing: 0.3,
  },
});

export { Sizes, Colors, Fonts, isTablet };
