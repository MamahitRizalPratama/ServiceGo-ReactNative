import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Home,
  Compass,
  Bookmark,
  User,
} from 'lucide-react-native';

import HomeStack from './src/navigation/HomeStack';
import DiscoverStack from './src/navigation/DiscoverStack';
import BookmarkScreen from './src/screen/BookmarkScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import AuthStack from './src/navigation/AuthStack';

const Tab = createBottomTabNavigator();

export default function App() {

  const [isLogin, setIsLogin] = useState(false);

  // DATA BOOKING
  const [bookmarks, setBookmarks] = useState([]);

  // LOGIN
  if (!isLogin) {
    return (
      <NavigationContainer>
        <AuthStack setIsLogin={setIsLogin} />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>

      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,

          tabBarActiveTintColor: '#4F46E5',
          tabBarInactiveTintColor: '#999',

          tabBarStyle: {
            height: 100,
            paddingBottom: 8,
          },

          tabBarIcon: ({ color, size }) => {

            if (route.name === 'Home') {
              return <Home color={color} size={size} />;
            }

            if (route.name === 'Discover') {
              return <Compass color={color} size={size} />;
            }

            if (route.name === 'Bookmark') {
              return <Bookmark color={color} size={size} />;
            }

            if (route.name === 'Profile') {
              return <User color={color} size={size} />;
            }

            return null;
          },
        })}
      >

        {/* HOME */}
        <Tab.Screen name="Home">
          {() => (
            <HomeStack
              bookmarks={bookmarks}
              setBookmarks={setBookmarks}
            />
          )}
        </Tab.Screen>

        {/* DISCOVER */}
        <Tab.Screen
          name="Discover"
          component={DiscoverStack}
        />

        {/* BOOKMARK / RIWAYAT BOOKING */}
        <Tab.Screen name="Bookmark">
          {() => (
            <BookmarkScreen
              bookmarks={bookmarks}
            />
          )}
        </Tab.Screen>

        {/* PROFILE */}
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
        />

      </Tab.Navigator>

    </NavigationContainer>
  );
}