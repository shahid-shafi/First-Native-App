/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Button} from 'react-native';
import * as yup from 'yup';
import {useAppDispatch} from 'react-redux';
import { signUp } from '../firebase/firebaseAuth';

const validationSchema = yup.object().shape({
  // name: yup.string().min(3).required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  // phone: yup.string().min(10).required('Phone is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const formFields = [
  // {key: '01', name: 'name', placeholder: 'Name'},
  {key: '02', name: 'email', placeholder: 'Email'},
  // {key: '03', name: 'phone', placeholder: 'Phone'},
  {key: '04', name: 'password', placeholder: 'Password', secureTextEntry: true},
];

interface formField {
  key: string;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
}
// const initialValues = {name: '', email: '', phone: '', password: ''};
const initialValues = {email: '', password: ''};

const SignUpPage = (props: any) => {
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<any>(initialValues);
  const [errors, setErrors] = useState<any>(initialValues);

  const handleInputChange = (field: any, value: string) => {
    setFormValues({...formValues, [field]: value});
  };

  const handleSubmit = async () => {
    try {
      await validationSchema.validate(formValues, {abortEarly: false});
      const {email, password} = formValues;
      const response = dispatch(signUp(email, password));
      if (response.additionalUserInfo?.isNewUser) {
        props.navigation.navigate('login');
      }
    } catch (error: any) {
      console.log('ErrorMessage: ', error.message);
      // const newErrors = {} as any;
      // error.inner.forEach((e: any) => {
      //   newErrors[e.path] = e.message;
      // });
      // setErrors(newErrors);
      // setFormValues(initialValues);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>
      {formFields?.map((field: formField) => (
        <View key={field.name}>
          <TextInput
            style={styles.input}
            placeholder={field.placeholder}
            placeholderTextColor="#999"
            onChangeText={text => handleInputChange(field.name, text)}
            value={formValues[field.name]}
            autoCapitalize="none"
            secureTextEntry={field.secureTextEntry || false}
          />
          {errors[field.name] && (
            <Text style={styles.error}>{errors[field.name]}</Text>
          )}
        </View>
      ))}
      <View style={styles.btnContainer}>
        <Button title="Create Account" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  heading: {
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 24,
    color: 'blue',
  },
  input: {
    height: 40,
    color: '#000',
    borderColor: 'gray',
    fontSize: 20,
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  btnContainer: {
    gap: 10,
  },
});

{
  /* <Image
  style={styles.image}
  source={{
    uri: 'https://img.freepik.com/free-icon/user_318-159711.jpg',
  }}
/>; */
}
