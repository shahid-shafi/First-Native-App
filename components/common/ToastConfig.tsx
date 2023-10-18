import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BaseToast, ErrorToast} from 'react-native-toast-message';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={styles.BaseToastStyle}
      contentContainerStyle={styles.BaseToastContainerStyle}
      text1Style={styles.BaseToastText1Style}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={styles.ErrorToastText1Style}
      text2Style={styles.ErrorToastText2Style}
    />
  ),

  tomatoToast: ({text1, props}: any) => (
    <View style={styles.TomatoToastStyle}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  BaseToastStyle: {borderLeftColor: 'lightgreen'},
  BaseToastContainerStyle: {borderLeftColor: 'pink'},
  BaseToastText1Style: {fontSize: 15, fontWeight: '400'},
  TomatoToastStyle: {height: 60, width: '100%', backgroundColor: 'tomato'},
  ErrorToastText1Style: {fontSize: 17},
  ErrorToastText2Style: {fontSize: 15},
});
