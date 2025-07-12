import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Sizes } from '../../Modules/ThemHelper';
import Icon from '../../Components/Icon';
const IMAGE_WIDTH = 180;

interface Props {
  label: string;
  onBack?: () => void;
}

const GenealScreen: React.FC<Props> = ({ label, onBack }) => {
  return (
    <LinearGradient
      colors={[Colors.Primary, Colors.Primary]}
      style={{
        width: '100%',
        height: 250,
      }}
      angle={110}
    >
      <View style={{}}>
        {onBack && (
          <TouchableOpacity
            style={{ position: 'absolute', top: 15, left: 15 }}
            onPress={onBack}
          >
            <Icon
              size={25}
              color={Colors.Black}
              name="arrowleft"
              type="AntDesign"
            />
          </TouchableOpacity>
        )}

        <View
          style={{
            marginHorizontal: Sizes.ScreenPadding,
            marginTop: Sizes.ScreenPadding + 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{ fontWeight: '800', fontSize: 40, color: Colors.White }}
            >{`Ecommerce `}</Text>
            <Text
              style={{ fontWeight: '300', fontSize: 40, color: Colors.White }}
            >{`Shop`}</Text>
          </View>
          <Text style={{ fontSize: 20 }}>{``}</Text>
        </View>

        <View
          style={{
            height: IMAGE_WIDTH,
            alignItems: 'center',
            // justifyContent: 'center',
            marginTop: Sizes.ScreenPadding,
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                color: Colors.White,
                fontSize: 18,
                fontWeight: '400',
              }}
            >{`${label}`}</Text>
          </View>
          <View style={{ height: 20 }} />
        </View>
      </View>
    </LinearGradient>
  );
};

export default GenealScreen;
