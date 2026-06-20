import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack({ setIsLogin }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >

      <Stack.Screen name="Login">
        {(props) => (
          <LoginScreen
            {...props}
            setIsLogin={setIsLogin}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />

    </Stack.Navigator>
  );
}