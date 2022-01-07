import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Navigator, RootStackParams } from './Navigator';
import { TabSearchScreen } from './TabSearch';


const Tab = createBottomTabNavigator();

export const Tabs = () => {
    return (
        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: 'white',
            }}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'black',
                tabBarLabelStyle: {
                    marginBottom: (Platform.OS === 'ios' ? 0 : 10)
                },
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: 'rgba(255,255,255,0.87)',
                    borderWidth: 0,
                    elevation: 0,
                    height: (Platform.OS === 'ios') ? 80 : 60
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Navigator}
                options={{
                    tabBarLabel: 'List',
                    tabBarLabelStyle: {
                        fontSize: 16,
                        top: -10,
                    },
                    tabBarIcon: ({ color }) => (
                        <Icon
                            color={color}
                            size={25}
                            name='list-outline'
                        />
                    )
                }}
            />

            <Tab.Screen
                name="SearchScreen"
                component={TabSearchScreen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarLabelStyle: {
                        fontSize: 16,
                        top: -10,
                    },
                    tabBarIcon: ({ color }) => (
                        <Icon
                            color={color}
                            size={25}
                            name='search-outline'
                        />
                    )
                }}
            />

        </Tab.Navigator>
    );
}
