import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Alert,
  BackHandler,
  Linking,
  ImageSourcePropType,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc } from 'firebase/firestore';
import { ActivityIndicator } from 'react-native';
import { db } from '../../Firebase/firebase.config';
import { MAIN_PROFILE_DATA } from '../../Modules/interface';
import { Colors } from '../../Modules/ThemHelper';
import { useDispatch } from 'react-redux';
import { setShowSplash, setUser } from '../../Redux/Slices/userSlice';

const SplashScreen = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    Read();
  }, []);

  const Read = async () => {
    try {
      const Mobile_Number = await AsyncStorage.getItem('MobileNumber');

      if (Mobile_Number) {
        const docRef = doc(db, 'Users', Mobile_Number.toString());
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data() as MAIN_PROFILE_DATA;
          console.log('data', data);
          const firebaseUserData = {
            ...data,
            REGISTERED_DATE: data.REGISTERED_DATE.toString(),
            LAST_SEEN: data.LAST_SEEN.toString(),
            LAST_USED: data.LAST_USED.toString(),
          };
          dispatch(setUser(firebaseUserData));

          setLoading(false);
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      dispatch(setShowSplash(false));
    }
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      ></View>
      {loading ? (
        <ActivityIndicator color={Colors.Primary} size={'large'} />
      ) : null}
    </View>
  );
};
export default SplashScreen;
