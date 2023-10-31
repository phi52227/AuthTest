import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

export default function AddrLoading() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>위치 비교중입니다...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  title: {
    fontSize: 25,
    fontWeight: '700',
    color: 'black',
  },
});
