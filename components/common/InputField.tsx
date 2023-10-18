import React from 'react';
import {TextInput} from 'react-native';

interface FieldProps {
  value?: string;
  placeholder: string;
  style?: any;
  onChangeText: (text: string) => void;
  placeholderTextColor?: string;
}

const InputField = ({
  value,
  placeholder,
  style,
  onChangeText,
  placeholderTextColor,
}: FieldProps) => {
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      style={style}
      onChangeText={onChangeText}
      placeholderTextColor={placeholderTextColor}
    />
  );
};

export default InputField;
