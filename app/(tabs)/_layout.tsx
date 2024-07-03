import { Image, Text, View } from "react-native";
import { Redirect,Tabs } from 'expo-router';
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
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
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
    <Tabs  screenOptions={{
      tabBarActiveTintColor: "#FFA001",
      tabBarInactiveTintColor: "#CDCDE0",
      tabBarShowLabel: false,
      tabBarStyle: {
        height: 84,
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
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
