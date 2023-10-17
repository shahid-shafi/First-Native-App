import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {addNewDocument} from '../../utils/firestore.crud';
import Toast from 'react-native-toast-message';

const AddNewPost = (props: any) => {
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    user: '',
    date: new Date(),
  });

  const handleInputChange = (key: string, value: string) => {
    setNewPost(prev => ({...prev, [key]: value}));
  };
  const handleAddNewDocument = async () => {
    try {
      if (!newPost.title) {
        throw new Error('Title is required');
      }
      if (!newPost.description) {
        throw new Error('Description is required');
      }
      if (!newPost.user) {
        throw new Error('User is required');
      }

      const response = await addNewDocument('posts', newPost);

      if (response) {
        Toast.show({
          type: 'success',
          text1: 'Toast Message',
          text2: 'Post Added Successfully',
          autoHide: true,
          visibilityTime: 2500,
        });

        props.navigation.navigate('home');
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.pageHeading}>Add New Post</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Title"
          style={styles.input}
          onChangeText={text => handleInputChange('title', text)}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Description"
          style={styles.input}
          onChangeText={text => handleInputChange('description', text)}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="User"
          style={styles.input}
          onChangeText={text => handleInputChange('user', text)}
          placeholderTextColor="#999"
        />
        <Pressable
          onPress={handleAddNewDocument}
          style={({pressed}: any) => [
            styles.button,
            {backgroundColor: pressed ? '#999' : '#000'},
          ]}>
          {({pressed}) => (
            <Text style={[styles.buttonText, pressed && styles.textPressed]}>
              Add New Post
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default AddNewPost;

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#ddd',
    height: '100%',
    padding: 10,
  },
  pageHeading: {
    textAlign: 'center',
    fontSize: 24,
    marginVertical: 10,
    color: '#00aaff',
  },
  inputContainer: {
    gap: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: '#777',
    borderRadius: 10,
    paddingHorizontal: 10,
    color: '#000',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  textPressed: {
    color: 'black', // Change text color when pressed
  },
});

//   const array = [
//     {
//       name: 'max',
//       age: 20,
//       phone: 12345678,
//       email: 'max@gmial.com',
//     },
//     {
//       name: 'john',
//       age: 60,
//       phone: 12345678,
//       email: 'john@gmial.com',
//     },
//     {
//       name: 'jonas',
//       age: 40,
//       phone: 12345678,
//       email: 'jonas@gmial.com',
//     },
//   ];
