import { Image, Text, View } from "react-native";
import { Redirect, Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import icons from '../../constants/icons';

// Define the interface for TabIcon props
interface TabIconProps {
  icon: any;
  color: string;
  focused: boolean;
}

// TabIcon Component
const TabIcon: React.FC<TabIconProps> = ({ icon, color, focused }) => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      backgroundColor: focused ? '#247991' : 'transparent', // Change 'blue' to your desired active background color
      borderRadius: 12, // Adjust the border radius as needed
      padding: 10, // Add padding to give some space around the icon
    }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{ tintColor: color, width: 24, height: 24 }}
      />
    </View>
  );
};

export default function TabLayout() {
  useEffect(() => {
    const setOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    };

    setOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "#CDCDE0",
      tabBarShowLabel: false,
      tabBarStyle: {
        height: 80,
      },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
        <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.search}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
        <Tabs.Screen
        name="save"
        options={{
          title: 'Save',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.save}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
        <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.explore}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
        <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
