import React, { Component } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ListCourses from './ListCourses';
import Profile from './Profile';

const Tab = createMaterialBottomTabNavigator();

class Home extends Component {
    render() {
        return (
            <Tab.Navigator
                initialRouteName="ListCourse"
                activeColor="tomato"
                // barStyle={{ backgroundColor: '#ffa' }}
            >
                <Tab.Screen
                    name="Course List"
                    component={ ListCourses }
                    options={{
                        tabBarLabel: 'Course List',
                        tabBarIcon: ({ color }) => (
                          <MaterialCommunityIcons name="book-open-variant" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Personal information"
                    component={ Profile }
                    options={{
                        tabBarLabel: 'Personal information',
                        tabBarIcon: ({ color }) => (
                          <MaterialCommunityIcons name="account" color={color} size={26} />
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}

export default Home;