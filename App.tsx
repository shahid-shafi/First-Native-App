import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LogInPage from './components/LogInPage';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import AddNewPost from './components/FireStore/AddNewPost';
import Toast from 'react-native-toast-message';
import {toastConfig} from './components/common/ToastConfig';

const Screens = [
  {name: 'login', component: LogInPage, options: {headerShown: true}},
  {name: 'sign-up', component: SignUpPage, options: {headerShown: true}},
  {name: 'home', component: HomePage, options: {headerShown: true}},
  {name: 'new-post', component: AddNewPost, options: {headerShown: true}},
];

function App() {
  const {Navigator, Screen} = createStackNavigator();

  return (
    <NavigationContainer>
      <Navigator initialRouteName="sign-up">
        {Screens.map(screen => (
          <Screen
            key={screen?.name}
            name={screen?.name}
            component={screen?.component}
            options={screen?.options}
          />
        ))}
      </Navigator>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}

export default App;
