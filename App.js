import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import LoginPage from './src/Pages/LoginPage';
import RegisterPage from './src/Pages/RegisterPage';
import HomePage from './src/Pages/HomePage';
import LockOptionsPage from './src/Pages/LockOptionsPage';

Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{headerShown: false, title: "Login ", headerStyle: {
            backgroundColor: '#6272a4', },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="RegisterPage" 
          component={RegisterPage}
          options={{headerShown: false, title: "Register", headerStyle: {
            backgroundColor: '#6272a4', },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="HomePage" 
          component={HomePage}
          options={{headerShown: false, title: "Home", headerStyle: {
            backgroundColor: '#6272a4', },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="LockOptionsPage" 
          component={LockOptionsPage}
          options={{headerShown: true, title: "Lock Options", headerStyle: {
            backgroundColor: '#6272a4', },
            headerTintColor: '#fff',
          }}
        />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar hidden/>
    </>
  );
}