import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const getIconName = (type: string): string => {
  switch (type) {
    case 'success':
      return 'check-circle';
    case 'info':
      return 'info-circle';
    case 'warning':
      return 'exclamation-circle';
    case 'error':
      return 'times-circle';
    default:
      return '';
  }
};

const ToastIcon = ({type, size = 24, color = '#fff'}: any) => {
  const iconName = getIconName(type);
  return (
    <View>
      {iconName && <Icon name={iconName} size={size} color={color} />}
    </View>
  );
};

export default ToastIcon;
