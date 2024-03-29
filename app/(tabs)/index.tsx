import {StyleSheet} from 'react-native';

import Home from './home';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import AddPost from './addPost';
import Dashboard from './dashboard';
import { MaterialIcons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { getData } from '../../utils/getData';
import { useFocusEffect } from 'expo-router';

const Tab = createBottomTabNavigator();

export default function Container(){

  const [show, setShow] = useState(false);

  useFocusEffect(() => {
    const userIn = getData("user").then((value) => {
      const user = JSON.parse(value!);
      if (user?.data?.token){
        setShow(true);
      }else{
        setShow(false);
      }
    }).catch(err => console.log(err));
  })

  return(
    <Tab.Navigator>
    <Tab.Screen
    name="Home" 
    component={Home} 
    options={{
      title: "Home",
      tabBarIcon: ({ color }) => <Ionicons name='md-home' size={24} color="black"/>,
    }}
    />
    {show &&<Tab.Screen
    name="Add Post" 
    component={AddPost} 
    options={{
      title: "Add Post",
      tabBarIcon: ({ color }) => <FontAwesome name='plus' size={24} color="black"/>,
    }}
    />}
    {show && <Tab.Screen
    name="Dashboard" 
    component={Dashboard} 
    options={{
      title: "Dashboard",
      tabBarIcon: ({ color }) => <MaterialIcons name="dashboard" size={24} color="black" />,
    }}
    />}
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 40,
    backgroundColor: "#f8f8f8",
  }
})
