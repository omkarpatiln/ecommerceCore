import { Text, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import React, { LegacyRef, useRef, useState } from 'react';

import LinearGradient from 'react-native-linear-gradient';
import Icon from './Icon';
import { Colors, Fonts, Sizes } from '../Modules/ThemHelper';
interface HEADER_PROPS {
  onBack?: () => void;
  rightChild?: any;
  leftChild?: any;
  label: string;
  onSearch?: (text: string) => void;
  TextStyles?: TextStyle;
  Colors1?: string;
}
const Header = ({
  onBack,
  rightChild,
  leftChild,
  label,
  onSearch,
  TextStyles,
  Colors1,
}: HEADER_PROPS) => {
  const [searched, setSearched] = useState(false);
  const searchedRef: any = useRef<TextInput>();
  return (
    <>
      <LinearGradient
        colors={[
          Colors1 ? Colors1 : Colors.Primary,
          Colors1 ? Colors1 : Colors.Primary,
        ]}
        angle={110}
        style={{
          width: Sizes.Width,
          height: Sizes.Header,
          shadowOpacity: 0.5,
          elevation: 10,
        }}
      >
        <View
          style={{
            width: Sizes.Width,
            height: Sizes.Header,
            shadowOpacity: 0.5,
            elevation: 5,
            paddingHorizontal: Sizes.ScreenPadding,
          }}
        >
          {onSearch && searched ? (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Icon
                name="arrow-back-ios"
                type="MaterialIcons"
                color={Colors.White}
                onPress={() => setSearched(false)}
                size={19}
                style={{ alignSelf: 'center', marginBottom: 3 }}
              />
              <TextInput
                ref={searchedRef}
                autoFocus
                onChangeText={text => onSearch(text)}
                style={{
                  flex: 1,
                  ...Fonts.M3,
                  color: Colors.Black,
                  backgroundColor: Colors.White,
                  borderRadius: Sizes.Radius,
                  marginHorizontal: Sizes.Base + 5,
                }}
                placeholder="Search Here"
                placeholderTextColor={Colors.Black}
                focusable={true}
              />
              <Icon
                name="close"
                type="SimpleLineIcons"
                color={'#f8f8ff'}
                onPress={() => {
                  setSearched(false);
                  searchedRef.current?.clear();
                  onSearch('');
                }}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {onBack ? (
                <Icon
                  name="arrow-back-ios"
                  type="MaterialIcons"
                  color={Colors.White}
                  onPress={() => onBack()}
                  style={{ alignSelf: 'center' }}
                  size={19}
                />
              ) : null}
              {leftChild ? leftChild : null}
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.B1,
                  fontSize: 18,
                  color: Colors.White,
                  flex: 1,
                  paddingHorizontal: Sizes.Base,
                  textAlignVertical: 'center',
                  ...TextStyles,
                }}
              >
                {label}
              </Text>
              {onSearch ? (
                <Icon
                  name="search"
                  type="Feather"
                  color={Colors.White}
                  style={{ marginHorizontal: Sizes.Padding }}
                  onPress={() => {
                    setSearched(true);
                  }}
                />
              ) : null}
              {rightChild ? rightChild : null}
            </View>
          )}
        </View>
      </LinearGradient>
      <View style={{ height: 2, backgroundColor: Colors.LightGray }} />
    </>
  );
};
export default Header;
