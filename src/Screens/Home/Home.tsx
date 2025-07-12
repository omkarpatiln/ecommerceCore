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
import { useDispatch } from 'react-redux';
import { clearUser } from '../../Redux/Slices/userSlice';
import { Products } from '../../Modules/interface';
import axios from 'axios';
import RenderListItem from './Components/renderItem';
type Props = StackProps<'Home'>;

const Home: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [allProducts, setAllProducts] = useState<Products[]>([]);
  const [loader, setLoader] = useState(true);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      setLoader(true);
      const response = await axios.get<Products[]>(
        `https://fakestoreapi.com/products/`,
        {
          timeout: 10000,
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log('res', response);

      if (!Array.isArray(response.data)) {
        throw new Error('Invalid product data format.');
      }

      setFilteredProducts(response.data);

      setAllProducts(response.data);
    } catch (error: any) {
      console.error('Error fetching products:', error?.message || error);
    } finally {
      setLoader(false);
    }
  };

  const handleSearch = useCallback(
    (text: string) => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }

      searchTimeout.current = setTimeout(() => {
        const filtered = allProducts.filter(product =>
          product.title.toLowerCase().includes(text.toLowerCase()),
        );
        setFilteredProducts(filtered);
      }, 300);
    },
    [allProducts],
  );
  return (
    <View style={{ flex: 1, backgroundColor: Colors.White }}>
      <Header
        label="Home"
        onSearch={Search => {
          handleSearch(Search);
        }}
        rightChild={
          <Icon
            onPress={async () => {
              await AsyncStorage.removeItem('MobileNumber');
              dispatch(clearUser());
            }}
            color={Colors.White}
            name="logout"
            type="AntDesign"
          />
        }
      />
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
          <FlatList
            data={filteredProducts}
            renderItem={({ item }) => (
              <RenderListItem
                onPress={() => {
                  navigation.navigate('ProductDetails', { Item: item });
                }}
                item={item}
              />
            )}
            keyExtractor={item => item.id.toString()}
            onEndReachedThreshold={0.3}
            ListEmptyComponent={
              <View>
                <ActivityIndicator
                  color={Colors.Primary}
                  size="small"
                  style={{ margin: 10 }}
                />
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

export default Home;
