import {StyleSheet, View, Text} from 'react-native';
export default function FlexBox() {
  return (
    <View style={styles.appContainer}>
      <View style={{...styles.box, backgroundColor: '#0f0', flex: 4}}>
        <Text>2</Text>
      </View>
      <View style={{...styles.box, backgroundColor: '#f00', flex: 7}}>
        <Text>1</Text>
      </View>
      <View style={{...styles.box, backgroundColor: '#00f', flex: 5}}>
        <Text>3</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    // flex: 1,
    width: '80%',
    height: 300,
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'stretch',
  },
  box: {
    // height: 100,
    // width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
