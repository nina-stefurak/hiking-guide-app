import React, { useEffect } from 'react';
import {Image, Platform, View} from "react-native";
import { Provider as PaperProvider } from 'react-native-paper'; 
import { Tabs } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
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
      if (Platform.OS !== 'web') {
          const lockOrientation = async () => {
              try {
                  await ScreenOrientation.lockAsync(
                      ScreenOrientation.OrientationLock.DEFAULT
                  );
              } catch (error) {
                  console.warn('Błąd blokowania orientacji:', error);
              }
          };

          lockOrientation();

          return () => {
              ScreenOrientation.unlockAsync();
          };
      }
  }, []);

  return (
      <Tabs screenOptions={{
          headerShown: false,
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
