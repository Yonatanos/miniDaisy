import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const TabLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Scanned',
          headerTintColor: 'white',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon color={color} name={focused ? 'scan' : 'scan-outline'} />
          ),
        }}
      />
      <Tabs.Screen
        name="notified"
        options={{
          title: 'Notified',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon color={color} name={focused ? 'chatbox' : 'chatbox-outline'} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
