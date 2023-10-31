import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import PermissionUtil, {APP_PERMISSION_CODE} from './PermissionUtil';

export type MenuScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Menu'
>;

export default function Menu({navigation}: MenuScreenProps) {
  const [phoneAuth, setPhoneAuth] = React.useState<boolean>(false);
  const [addressAuth, setAddressAuth] = React.useState<boolean>(false);

  useEffect(() => {
    PermissionUtil.cmmReqPermis(APP_PERMISSION_CODE.location);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Phone', {setPhoneAuth: setPhoneAuth});
        }}>
        <Text style={styles.text}>전화번호 인증 테스트</Text>
        <Text style={styles.booleanText}>{phoneAuth.toString()}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Address', {setAddressAuth: setAddressAuth});
        }}>
        <Text style={styles.text}>주소 인증 테스트</Text>
        <Text style={styles.booleanText}>{addressAuth.toString()}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setPhoneAuth(false);
          setAddressAuth(false);
        }}>
        <Text style={styles.text}>인증 정보 초기화</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '75%',
    alignContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    marginVertical: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    color: 'black',
    padding: 10,
  },
  booleanText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    color: 'red',
    padding: 10,
  },
});
