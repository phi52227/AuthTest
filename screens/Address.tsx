import React from 'react';
import {View} from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export type AddressScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Address'
>;

export default function Address({navigation, route}: AddressScreenProps) {
  const {setAddressAuth} = route.params;

  // 검색한 주소의 데이터를 넘겨 현재 주소랑 비교
  const getAddressData = data => {
    navigation.navigate('CompareAddr', {
      address: data.roadAddress,
      afterCheck: afterCheck,
    });
  };

  // 비교 페이지에서 확인 버튼을 누르면 그 결과값을 가지고 메인화면으로 복귀
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
