import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {LogBox} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';

export type PhoneScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Phone'
>;

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const re = /^[0-9]+$/;

export default function Phone({navigation, route}: PhoneScreenProps) {
  const {setPhoneAuth} = route.params;

  const [number, setNumber] = React.useState<string>();
  const [touchable, setTouchable] = React.useState<boolean>(false);

  // 검색한 주소의 데이터를 넘겨 현재 주소랑 비교
  const getPhoneNumber = () => {
    navigation.navigate('PhoneAuth', {
      number,
      afterCheck: afterCheck,
    });
  };

  // 인증 페이지에서 확인 버튼을 누르면 그 결과값을 가지고 메인화면으로 복귀
  const afterCheck = (auth: boolean) => {
    setPhoneAuth(auth);
    navigation.goBack();
  };

  const checkNumber = (num: string) => {
    if (num.match(re)) {
      setNumber(num);
      // eslint-disable-next-line eqeqeq
      if (num.length == 11) {
        setTouchable(true);
      } else {
        setTouchable(false);
      }
      // eslint-disable-next-line eqeqeq
    } else if (num == '') {
      setNumber('');
    } else {
      setTouchable(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>휴대폰 번호를 입력해주세요.</Text>
      <TextInput
        style={styles.input}
        maxLength={11}
        value={number}
        onChangeText={value => checkNumber(value)}
      />
      <TouchableOpacity
        style={[
          styles.button,
          // eslint-disable-next-line react-native/no-inline-styles
          {backgroundColor: touchable ? '#121215' : '#777777'},
        ]}
        disabled={!touchable}
        onPress={() => getPhoneNumber()}>
        <Text style={styles.buttonText}>확인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: 'black',
    marginTop: 50,
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },
  input: {
    height: 40,
    width: '90%',
    color: 'black',
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#444444',
  },
  button: {
    width: '90%',
    height: 40,
    marginTop: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
});
