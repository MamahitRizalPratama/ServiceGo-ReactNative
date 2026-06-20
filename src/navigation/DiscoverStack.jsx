import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DiscoverScreen from '../screen/DiscoverScreen';
import DetailNewsScreen from '../screen/DetailNewsScreen';

const Stack = createNativeStackNavigator();

export default function DiscoverStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="DiscoverMain"
        component={DiscoverScreen}
      />

      <Stack.Screen
        name="DetailNews"
        component={DetailNewsScreen}
      />
    </Stack.Navigator>
  );
}