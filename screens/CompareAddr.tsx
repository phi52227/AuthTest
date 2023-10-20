import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import AddrLoading from './AddrLoading';

export type CompareAddrScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CompareAddr'
>;

const REST_API_KEY = 'b74901e3aff4bc4e98aefd25a745b9f8';

export default function CompareAddr({
  navigation,
  route,
}: CompareAddrScreenProps) {
  // let addrX = 0;
  // let addrY = 0;
  // let currentX = 0;
  // let currentY = 0;
  // let distance = 0;
  const earthRadius = 6371; // 지구 반지름 (km 단위)
  const radian = 0.017453; // 라디안 (π / 180)
  const latitudeToMeter = 111194.926645; //위도 1도를 미터 단위로 환산한 값 (m 단위)
  let longitudeToMeter = 0; //경도 1도를 미터 단위로 환산한 값 (위도에 따라 경도가 다르므로 계산 필요, m 단위)
  const {address} = route.params;

  const [loading, setLoading] = useState(true);
  const [include, setInclude] = useState(false);
  useEffect(() => {
    const compare = async () => {
      const [addrX, addrY] = await requestAddress();
      const [currentX, currentY] = await requestCurrentAddress();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      longitudeToMeter = await measureLongitudeToMeter(addrY);
      const distance = await measureDistance(addrX, addrY, currentX, currentY);
      if (distance < 50) {
        setInclude(true);
      } else {
        setInclude(false);
      }
      setLoading(false);
    };
    compare();
  }, []);

  const requestAddress = async () => {
    console.log('1 start');
    try {
      const response = await axios.get(
        'https://dapi.kakao.com/v2/local/search/address.json?query=' +
          encodeURIComponent(address),
        {
          headers: {Authorization: `KakaoAK ${REST_API_KEY}`},
        },
      );
      const x = parseFloat(response.data.documents[0].x);
      const y = parseFloat(response.data.documents[0].y);
      console.log('1 end');
      return [x, y];
      // console.log('address x = ' + addrX + ' address y = ' + addrY);
    } catch (error) {
      console.error(error);
    }
  };

  const requestCurrentAddress = () => {
    return new Promise((resolve, reject) => {
      console.log('2 start');

      Geolocation.getCurrentPosition(
        info => {
          const x = info.coords.longitude;
          const y = info.coords.latitude;
          console.log('2 end');
          resolve([x, y]);
        },
        error => {
          console.log(error.code, error.message);
          reject(error);
        },
        {enableHighAccuracy: true},
      );
    });
  };

  const measureLongitudeToMeter = async addrY => {
    console.log('3');
    return earthRadius * radian * Math.cos(addrY * radian) * 1000;
  };

  const measureDistance = async (x1, y1, x2, y2) => {
    console.log('4');
    const differenceX = (x1 - x2) * longitudeToMeter;
    const differenceY = (y1 - y2) * latitudeToMeter;
    const differenceDistance = Math.sqrt(
      Math.pow(differenceX, 2) + Math.pow(differenceY, 2),
    );
    return differenceDistance;
  };

  return loading ? (
    <AddrLoading />
  ) : !include ? (
    <View>
      <Text>주소와 일치하지 않습니다.</Text>
    </View>
  ) : (
    <View>
      <Text>주소 인증에 성공했습니다.</Text>
    </View>
  );
}

// const styles = StyleSheet.create({});
