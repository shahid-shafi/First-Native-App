import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LogInPage from './components/LogInPage';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import AddNewPost from './components/FireStore/AddNewPost';
import Toast from 'react-native-toast-message';

const Screens = [
  {name: 'login', component: LogInPage, options: {headerShown: false}},
  {name: 'sign-up', component: SignUpPage, options: {headerShown: false}},
  {name: 'home', component: HomePage, options: {headerShown: false}},
  {name: 'new-post', component: AddNewPost, options: {headerShown: false}},
];

function App() {
  const {Navigator, Screen} = createStackNavigator();

  return (
    <NavigationContainer>
      <Navigator initialRouteName="home">
        {Screens.map(screen => (
          <Screen
            key={screen?.name}
            name={screen?.name}
            component={screen?.component}
            options={screen?.options}
          />
        ))}
      </Navigator>
      <Toast />
    </NavigationContainer>
  );
}

export default App;
