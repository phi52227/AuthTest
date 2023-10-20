import React from 'react';
import {View} from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';

export type AddressScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Address'
>;

export default function Address({navigation, route}: AddressScreenProps) {
  const {setAddressAuth} = route.params;

  const getAddressData = data => {
    navigation.navigate('CompareAddr', {
      address: data.roadAddress,
      afterCheck: afterCheck,
    });
  };

  const afterCheck = (auth: boolean) => {
    setAddressAuth(auth);
    navigation.goBack();
  };

  return (
    <View>
      <Postcode
        // eslint-disable-next-line react-native/no-inline-styles
        style={{width: '100%', height: '100%'}}
        jsOptions={{animation: true}}
        onSelected={data => {
          getAddressData(data);
          // console.log(JSON.stringify(data));
        }}
      />
    </View>
  );
}
