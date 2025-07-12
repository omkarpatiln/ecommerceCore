import React from 'react';
import {
  Modal as ModalComponent,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors, Fonts, Sizes } from '../Modules/ThemHelper';
import Icon from './Icon';

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  animation?: 'fade' | 'slide';
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  TitleViewStyle?: ViewStyle;
  title?: string;
  textStyle?: TextStyle;
};
const Modal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  children,
  animation,
  style,
  containerStyle,
  textStyle,
  TitleViewStyle,
  title,
}) => {
  return (
    <ModalComponent
      visible={isVisible}
      transparent
      animationType={animation ? animation : 'slide'}
      onRequestClose={onClose}
    >
      <View style={[{ flex: 1, justifyContent: 'center' }, containerStyle]}>
        <Text
          onPress={onClose}
          style={{
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: Colors.modalBackground,
          }}
        />
        <View
          style={[
            {
              margin: Sizes.ScreenPadding,
              padding: Sizes.Padding,
              borderRadius: Sizes.Base,
              backgroundColor: Colors.Background,
            },
            style,
          ]}
        >
          {title ? (
            <View style={{ flexDirection: 'row', ...TitleViewStyle }}>
              <Text
                style={{
                  ...Fonts.B2,
                  color: Colors.PrimaryText1,
                  flex: 1,
                  ...textStyle,
                }}
              >
                {'' + title}
              </Text>
              <View
                style={{
                  backgroundColor: Colors.LightGray,
                  padding: Sizes.Base,
                  borderRadius: Sizes.ScreenPadding,
                }}
              >
                <Icon
                  type={'AntDesign'}
                  name={'close'}
                  color={Colors.White}
                  onPress={() => onClose()}
                />
              </View>
            </View>
          ) : null}
          {children}
        </View>
      </View>
    </ModalComponent>
  );
};
export default Modal;
