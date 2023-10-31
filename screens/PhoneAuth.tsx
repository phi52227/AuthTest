import React, {useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import axios from 'axios';

export type PhoneAuthScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PhoneAuth'
>;

const re = /^[0-9]+$/;

export default function PhoneAuth({navigation, route}: PhoneAuthScreenProps) {
  const {number, afterCheck} = route.params;

  const [authNumber, setAuthNumber] = React.useState<string>();
  const [touchable, setTouchable] = React.useState<boolean>(false);

  // 인증번호 생성 및 문자 전송 api 호출
  useEffect(() => {
    axios
      .post('http://27.96.134.242:8000/api/auth/sms/request', {
        phone_number: number,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [number]);

  const checkNumber = (num: string) => {
    if (num.match(re)) {
      setAuthNumber(num);
      if (num.length == 6) {
        setTouchable(true);
      } else {
        setTouchable(false);
      }
    } else if (num == '') {
      setAuthNumber('');
    } else {
      setTouchable(false);
    }
  };

  const checkAuthNumber = async (userAuthNumber: string) => {
    try {
      const response = await axios.get(
        'http://27.96.134.242:8000/api/auth/sms/request?phone_number=' +
          number +
          '&auth_number=' +
          userAuthNumber,
      );
      console.log(response.data);
      return response.data.result;
    } catch (error) {
      console.error(error);
    }
  };

  const pushOKButton = async () => {
    const auth = await checkAuthNumber(authNumber);
    if (auth) {
      Alert.alert('인증 성공', '본인인증에 성공하였습니다.', [
        {
          text: '확인',
          onPress: () => {
            navigation.goBack();
            afterCheck(auth);
          },
        },
      ]);
    } else {
      Alert.alert(
        '인증 실패',
        '인증번호가 틀리거나 인증번호 입력시간을 초과하였습니다.',
        [
          {
            text: '확인',
            onPress: () => {
              navigation.goBack();
            },
          },
        ],
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>전송된 인증번호를 입력해주세요.</Text>
      <TextInput
        style={styles.input}
        maxLength={6}
        value={authNumber}
        onChangeText={value => checkNumber(value)}
      />
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: touchable ? '#121215' : '#777777'},
        ]}
        disabled={!touchable}
        onPress={() => pushOKButton()}>
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
