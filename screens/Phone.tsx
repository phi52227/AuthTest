import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const re = /^[0-9]+$/;

export default function Phone() {
  const [number, setNumber] = React.useState<string>();
  const [touchable, setTouchable] = React.useState<boolean>(false);

  const checkNumber = (num: string) => {
    if (num.match(re)) {
      setNumber(num);
      if (num.length == 11) {
        setTouchable(true);
      } else {
        setTouchable(false);
      }
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
          {backgroundColor: touchable ? '#121215' : '#777777'},
        ]}
        disabled={!touchable}>
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
