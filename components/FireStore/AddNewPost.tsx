import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {addNewDocument, updateData} from '../../utils/firestore.crud';
import Toast from 'react-native-toast-message';
import InputField from '../common/InputField';

const AddNewPost = (props: any) => {
  const post = props?.route?.params?.post || null;
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    user: '',
    date: new Date().toUTCString(),
  });

  useEffect(() => {
    if (post) {
      setNewPost({
        title: post?.title,
        description: post?.description,
        user: post?.user,
        date: post?.date,
      });
    }
  }, [post]);

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

      const response = post
        ? await updateData('posts', post.id, newPost)
        : await addNewDocument('posts', newPost);

      if (response?.status) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: post ? 'Post Updated Successfully' : 'Post Added Successfully',
          autoHide: true,
          visibilityTime: 2500,
        });

        props.navigation.navigate('home');
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const fields = [
    {
      title: 'title',
      placeholder: 'Title',
      placeholderTextColor: '#999',
      styles: styles.input,
    },
    {
      title: 'description',
      placeholder: 'Description',
      placeholderTextColor: '#999',
      styles: styles.input,
    },
    {
      title: 'user',
      placeholder: 'User',
      placeholderTextColor: '#999',
      styles: styles.input,
    },
  ];

  interface NewPost {
    title: string;
    description: string;
    user: string;
  }

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.pageHeading}>Add New Post</Text>
      <View style={styles.inputContainer}>
        {fields.map((field: any) => (
          <InputField
            key={field.title}
            value={newPost[field?.title as keyof NewPost] || undefined}
            placeholder={field.placeholder}
            style={field.styles}
            onChangeText={text => handleInputChange(field.title, text)}
            placeholderTextColor={field.placeholderTextColor}
          />
        ))}
        <Pressable
          onPress={handleAddNewDocument}
          style={({pressed}: any) => [
            styles.button,
            {backgroundColor: pressed ? '#999' : '#000'},
          ]}>
          {({pressed}) => (
            <Text style={[styles.buttonText, pressed && styles.textPressed]}>
              {post ? 'Update Post' : 'Add New Post'}
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
