import {
  ActivityIndicator,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ViewStyle } from 'react-native';
import { TextStyle } from 'react-native';
import { Colors, Fonts, Sizes } from '../../Modules/ThemHelper';

interface TEXT_BUTTON {
  label: string;
  onPress: () => void;
  loading: boolean;
  disable?: boolean;
  colors?: string[];
  activeOpacity?: number;
  leftChild?: any;
  rightChild?: any;
  style?: ViewStyle;
  LinearGradientStyle?: ViewStyle;
  textStyle?: TextStyle;
  isBorder?: boolean;
}
const TextButton = ({
  label,
  onPress,
  loading,
  disable,
  leftChild,
  rightChild,
  colors,
  style,
  textStyle,
  isBorder,
  activeOpacity,
  LinearGradientStyle,
}: TEXT_BUTTON) => {
  const colorCode = disable
    ? ['#808080', '#999999']
    : colors
    ? colors
    : [Colors.Primary2, Colors.Primary];
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        height: Sizes.Field,
        borderRadius: Sizes.Radius,
        ...style,
      }}
      onPress={() => onPress()}
      activeOpacity={activeOpacity ? activeOpacity : 0.7}
      disabled={disable || loading}
      hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
    >
      <LinearGradient
        colors={colorCode}
        style={{
          flex: 1,
          borderRadius: Sizes.Radius,
          ...LinearGradientStyle,
        }}
      >
        <View
          style={{
            flex: 1,
            margin: 1,
            backgroundColor: isBorder ? Colors.White : 'transparent',
            borderRadius: Sizes.Radius - 1,
            paddingHorizontal: Sizes.Radius,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {leftChild ? leftChild : null}
          <Text
            style={{
              ...Fonts.B2,
              flex: 1,
              textAlign: 'center',
              textAlignVertical: 'center',
              color: isBorder ? colorCode[0] : Colors.White,
              ...textStyle,
            }}
            numberOfLines={1}
            selectable={false}
          >
            {label}
          </Text>
          {loading ? (
            <ActivityIndicator
              color={isBorder ? colorCode[0] : Colors.Black}
              style={{
                position: 'absolute',
                right: 10,
              }}
            />
          ) : null}
          {rightChild ? rightChild : null}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({});
