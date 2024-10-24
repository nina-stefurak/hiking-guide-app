import { Image, Text, View } from "react-native";
import { Redirect, Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import icons from '../../constants/icons';

interface TabIconProps {
  icon: any;
  color: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, focused }) => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      backgroundColor: focused ? '#247991' : 'transparent', 
      borderRadius: 12,
      padding: 10,
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
