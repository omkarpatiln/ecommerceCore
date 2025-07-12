import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Products } from '../../../Modules/interface';
import { Colors, Sizes } from '../../../Modules/ThemHelper';
import { Rating } from 'react-native-ratings';

interface Props {
  item: Products;
  onPress: () => void;
}

const RenderListItem: React.FC<Props> = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={{ width: '60%', alignItems: 'center' }}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>
        <Text style={styles.price}>₹ {item.price.toFixed(2)}</Text>

        <Rating
          readonly
          startingValue={item.rating.rate}
          imageSize={25}
          style={{ paddingVertical: 10 }}
          showReadOnlyText={false}
        />
      </View>
    </TouchableOpacity>
  );
};

export default RenderListItem;
const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.White,
    margin: 5,
    padding: 10,
    borderRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
    padding: Sizes.Padding,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
    marginEnd: Sizes.Padding,
    textAlign: 'center',
    color: Colors.Primary,
  },
  description: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
    marginEnd: Sizes.Padding,
    textAlign: 'center',
    color: Colors.TextGray,
  },
  price: {
    fontSize: 16,
    color: Colors.Black,
    marginTop: 4,
    fontWeight: '800',
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});
