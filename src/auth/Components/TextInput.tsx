import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput as TextField,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { Colors, Fonts, Sizes } from '../../Modules/ThemHelper';
interface INPUT_INTERFACE {
  leftChild?: any;
  rightChild?: any;
  ref?: any;
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  disable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  maxLength?: number;
  numberOfLines?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
  error?: boolean;
  label?: string;
  labelStyle?: TextStyle;
  hidden?: boolean;
  imp?: boolean;
  autoFocus?: boolean;
}
const TextInput = ({
  leftChild,
  rightChild,
  value,
  placeholder,
  onChangeText,
  numberOfLines,
  disable,
  keyboardType = 'default',
  multiline = false,
  maxLength,
  style,
  textStyle,
  error,
  label,
  labelStyle,
  hidden,
  imp,
  autoFocus = true,
  ref,
}: INPUT_INTERFACE) => {
  return (
    <View style={{ width: '100%' }}>
      {label && (
        <Text
          style={{
            ...Fonts.Medium3,
            color: Colors.PrimaryText1,
            ...labelStyle,
          }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {'' + label}
          {imp ? (
            <Text
              style={{
                ...Fonts.R3,
                color: '#FF0123',
                ...labelStyle,
              }}
            >
              {'*'}
            </Text>
          ) : (
            ''
          )}
        </Text>
      )}
      <View
        style={[
          {
            width: '100%',
            borderRadius: Sizes.Radius,
            minHeight: multiline ? Sizes.Field * 2 : 40,
            maxHeight: multiline ? Sizes.Field * 3 : 40,
            borderColor: disable
              ? Colors.Disable
              : error
              ? Colors.error
              : Colors.Primary2,
            // borderWidth: 1,
            borderWidth: 0,
            elevation: 6,
            shadowColor: Colors.Primary,
            flexDirection: 'row',
            alignItems: multiline ? 'flex-start' : 'center',
            backgroundColor: Colors.White,
          },
          { ...style },
        ]}
      >
        {leftChild ? leftChild : null}
        <TextField
          ref={ref}
          focusable={true}
          autoFocus={autoFocus}
          secureTextEntry={hidden ? true : false}
          keyboardType={keyboardType}
          value={value}
          numberOfLines={numberOfLines}
          onChangeText={(text: string) => {
            onChangeText(text);
          }}
          style={[
            {
              flex: 1,
              paddingHorizontal: Sizes.Padding,
              ...Fonts.M3,
              alignItems: 'center',
              textAlignVertical: multiline ? 'center' : 'center',
              justifyContent: 'center',
              color: error ? Colors.Red : Colors.White,
              paddingVertical: 0,
              height: 100,
            },
            { ...textStyle },
          ]}
          editable={!disable}
          placeholder={placeholder}
          placeholderTextColor={
            error
              ? Colors.Red + '80'
              : disable
              ? Colors.Disable
              : Colors.PrimaryText2
          }
          multiline={multiline}
          maxLength={maxLength}
        />
        {rightChild ? rightChild : null}
      </View>
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({});
