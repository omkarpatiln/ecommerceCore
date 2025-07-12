import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StackProps } from '../../Routes';
import Header from '../../Components/Header';
import Icon from '../../Components/Icon';
import { Colors, Sizes } from '../../Modules/ThemHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../Redux/Slices/userSlice';
import { Products } from '../../Modules/interface';
import axios from 'axios';
import { RootState } from '../../Redux';
import RenderListItem from './Component/renderItem';
import { removeFromCart } from '../../Redux/Slices/cartSlice';
import TextButton from '../../auth/Components/TextButton';
type Props = StackProps<'AddToCart'>;

const AddToCart: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const { items } = useSelector((state: RootState) => state.cart);

  const totalPrice = useSelector((state: RootState) =>
    state.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    ),
  );
  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.White }}>
      <Header label="Cart" />
      {loader ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator
            color={Colors.Primary}
            size="small"
            style={{ margin: 10 }}
          />
        </View>
      ) : (
        <View style={{ flex: 1, margin: Sizes.Padding }}>
          <View
            style={{
              marginBottom: 10,
              padding: 10,
              backgroundColor: '#f1f1f1',
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: Colors.Primary,
                textAlign: 'center',
              }}
            >
              Total Price: ₹ {totalPrice.toFixed(2)}
            </Text>
            <View style={{ width: '60%', alignSelf: 'center' }}>
              <TextButton
                onPress={() => {}}
                style={{ margin: Sizes.Padding }}
                loading={false}
                label="Proceed to Pay"
              />
            </View>
          </View>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <RenderListItem
                onPress={() => {}}
                RemoveCart={() => {
                  handleRemove(item.id);
                }}
                item={item}
              />
            )}
            keyExtractor={item => item.id.toString()}
            onEndReachedThreshold={0.3}
            ListEmptyComponent={
              <View>
                <Text style={{ textAlign: 'center' }}>{`No Data Found`}</Text>
              </View>
            }
            showsVerticalScrollIndicator={false}
            initialNumToRender={6}
            maxToRenderPerBatch={6}
            windowSize={10}
            removeClippedSubviews
          />
        </View>
      )}
    </View>
  );
};

export default AddToCart;
