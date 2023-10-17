import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveLocalData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log('Data saved successfully!');
  } catch (error) {
    console.error('Error saving data: ', error);
    throw error;
  }
};

export const getLocalData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log('Retrieved data: ', value);
      return value;
    } else {
      console.log('No data with this key!');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving data: ', error);
    throw error;
  }
};

export const removeLocalData = async () => {
  try {
    await AsyncStorage.removeItem('key');
    console.log('Data removed successfully!');
  } catch (error) {
    console.error('Error removing data: ', error);
    throw error;
  }
};
