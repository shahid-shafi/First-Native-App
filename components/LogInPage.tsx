import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Button} from 'react-native';
import * as yup from 'yup';
import {firebaseSignIn} from '../utils/firebaseAuth';
import {saveLocalData} from '../utils/asyncStorage.service';

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});
const initialValues = {email: '', password: ''};

const formFields = [
  {key: '01', name: 'email', placeholder: 'Email'},
  {key: '02', name: 'password', placeholder: 'Password', secureTextEntry: true},
];

interface formField {
  key: string;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
}

const LogInPage = (props: any) => {
  const [formValues, setFormValues] = useState<any>(initialValues);
  const [errors, setErrors] = useState<any>(initialValues);

  const handleInputChange = (field: any, value: string) => {
    setFormValues({...formValues, [field]: value});
  };

  const handleSubmit = async () => {
    try {
      await validationSchema.validate(formValues, {abortEarly: false});
      const {email, password} = formValues;
      const response = await firebaseSignIn(email, password);

      if (!response.additionalUserInfo?.isNewUser) {
        await saveLocalData('user', response.user);
        props.navigation.navigate('home');
      }
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        const newErrors = {} as any;
        error.inner.forEach((e: any) => {
          newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      }
      console.log('ErrorMessage: ', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign In</Text>
      {formFields?.map((field: formField) => (
        <View key={field.name}>
          <TextInput
            placeholderTextColor="#999"
            style={styles.input}
            placeholder={field.placeholder}
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
      <View>
        <Button title="Log In" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default LogInPage;

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
});
