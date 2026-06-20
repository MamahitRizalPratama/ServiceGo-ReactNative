import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screen/HomeScreen';
import DetailScreen from '../screen/DetailScreen';
import DetailNewsScreen from '../screen/DetailNewsScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack({
  bookmarks,
  setBookmarks,
}) {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >

      {/* HOME */}
      <Stack.Screen name="HomeScreen">
        {(props) => (
          <HomeScreen
            {...props}
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
          />
        )}
      </Stack.Screen>

      {/* DETAIL SERVICE */}
      <Stack.Screen name="Detail">
        {(props) => (
          <DetailScreen
            {...props}
            setBookmarks={setBookmarks}
          />
        )}
      </Stack.Screen>

      {/* DETAIL NEWS */}
      <Stack.Screen
        name="DetailNews"
        component={DetailNewsScreen}
      />

    </Stack.Navigator>
  );
}