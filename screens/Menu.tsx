import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';

export type MenuScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Menu'
>;

export default function Menu({navigation}: MenuScreenProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Phone');
        }}>
        <Text style={styles.text}>전화번호 인증 테스트</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Address');
        }}>
        <Text style={styles.text}>주소 인증 테스트</Text>
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
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
    color: 'black',
    padding: 10,
  },
});
