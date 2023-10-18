import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

interface Props {
  type: string;
  message: string;
}

const ToastMessage = ({type, message: text1}: Props) => {
  return Toast.show({
    type,
    text1,
    // text2: post ? 'Post Updated Successfully' : 'Post Added Successfully',
    autoHide: true,
    visibilityTime: 2500,
  });
};

export default ToastMessage;
