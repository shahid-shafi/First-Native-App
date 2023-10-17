import {useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
const Form = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const handleSubmit = () => {};
  return (
    <View style={styles.container}>
      {email && <Text>{email}</Text>}
      {password && <Text>{password}</Text>}

      <Text style={styles.label}>Email</Text>
      <TextInput placeholder="Email" style={styles.textInput} />

      <Text style={styles.label}>Password</Text>
      <TextInput placeholder="Password" style={styles.textInput} />

      <Button title="Submit" />
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'left',
    width: '80%',
    margin: 8,
    fontSize: 24,
  },
  textInput: {
    borderWidth: 2,
    padding: 10,
    borderColor: '#333',
    width: '80%',
  },
  img: {
    height: 50,
    width: 50,
  },
});


// return (
//     <View style={styles.appContainer}>
//       <View style={styles.inputContainer}>
//         <TextInput style={styles.textInput} placeholder="Enter Todo" />
//         <Button title="Add Todo" />
//       </View>
//       <View>
//         <Text>Todo List</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   appContainer: {
//     padding: 50,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   textInput: {
//     width: '80%',
//     borderWidth: 1,
//     borderColor: '#999',
//     marginRight: 8,
//     padding: 8,
//   },
// });