import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

const Page = ({ children }) => (
  <View
    style={[styles.background, { width: '100%', height: '100%' }]}
  >
    <SafeAreaView style={styles.safe}>{children}</SafeAreaView>
  </View>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  safe: {
    flex: 1,
  }
});

export default Page;
