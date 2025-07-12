import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { StackProps } from '../../Routes';
import Header from '../../Components/Header';
import ProductComponent from './Components/ProductComponent';
import TextButton from '../../auth/Components/TextButton';
import { Colors, Sizes } from '../../Modules/ThemHelper';
import { useDispatch, useSelector } from 'react-redux';
import {
  isProductInCart,
  selectProductQuantityById,
  selectTotalCartQuantity,
} from '../../functions';
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from '../../Redux/Slices/cartSlice';
type Props = StackProps<'ProductDetails'>;

const ProductDetails: React.FC<Props> = ({ navigation, route }) => {
  const { Item } = route.params;

  const dispatch = useDispatch();
  const totalQty = useSelector(selectProductQuantityById(Item.id));

  const handleAdd = () => {
    dispatch(addToCart(Item));
  };
  const handleRemove = () => {
    dispatch(decreaseQuantity(Item.id));
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.White }}>
      <Header
        label={Item.category}
        onBack={() => {
          navigation.goBack();
        }}
        rightChild={
          <TextButton
            colors={[Colors.Red, Colors.Red]}
            label="Go To Cart"
            loading={false}
            style={{ width: 100 }}
            onPress={() => {
              navigation.navigate('AddToCart');
            }}
          />
        }
      />
      <ScrollView>
        <ProductComponent item={Item} onPress={() => {}} />
      </ScrollView>
      <View style={{ flexDirection: 'row', margin: Sizes.Margin }}>
        <View style={{ flex: 1 }}>
          <TextButton
            label={`Add To Cart (${totalQty})`}
            activeOpacity={1}
            rightChild={
              <Text
                onPress={handleAdd}
                style={{
                  fontSize: 25,
                  color: Colors.White,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                }}
              >{`+`}</Text>
            }
            leftChild={
              <TouchableOpacity
                onPress={handleRemove}
                style={{
                  width: 15,
                  height: '100%',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    height: 2,
                    width: 15,
                    backgroundColor: Colors.White,
                  }}
                />
              </TouchableOpacity>
            }
            style={{ opacity: 1 }}
            loading={false}
            onPress={() => {}}
          />
        </View>
        <View style={{ width: Sizes.Base }} />

        <View style={{ flex: 1 }}>
          <TextButton
            label="Save For Later"
            loading={false}
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;
