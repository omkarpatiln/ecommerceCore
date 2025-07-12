import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Products } from '../../../Modules/interface';
import { Colors, Sizes } from '../../../Modules/ThemHelper';
import { Rating } from 'react-native-ratings';
import Spacing from '../../../Components/Spacing';
import TextButton from '../../../auth/Components/TextButton';

interface Props {
  item: Products;
  onPress: () => void;
}

const ProductComponent: React.FC<Props> = ({ item, onPress }) => {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <View style={{ marginBottom: Sizes.Base }}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <Spacing height={20} />

        <View style={{ height: 1, backgroundColor: Colors.GrayBorder }} />

        <View style={{ marginTop: Sizes.Base }}>
          <Spacing height={20} />
          <Text numberOfLines={1} style={styles.title}>
            {item.title}
          </Text>
          <Spacing height={20} />

          <Text style={styles.price}>₹ {item.price.toFixed(2)}</Text>
          <Spacing height={20} />

          <Rating
            showRating
            startingValue={item.rating.rate}
            imageSize={45}
            readonly
            showReadOnlyText={false}
            style={{ paddingVertical: 10, alignSelf: 'center' }}
          />

          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProductComponent;
const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.White,
    padding: 10,
    borderRadius: 8,
  },
  image: {
    height: 300,
    width: 300,
    padding: Sizes.Padding,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 5,
    marginEnd: Sizes.Padding,
    textAlign: 'center',
    color: Colors.Black,
  },
  description: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
    marginEnd: Sizes.Padding,
    color: Colors.TextGray,
  },
  price: {
    fontSize: 24,
    color: Colors.Black,
    marginTop: 4,
    fontWeight: '800',
    textAlign: 'center',
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});
