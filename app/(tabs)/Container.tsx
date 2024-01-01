import {StyleSheet} from 'react-native';

import Home from './home';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import AddPost from './addPost';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function Container(){


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
    <Tab.Screen 
    name="Add Post" 
    component={AddPost} 
    options={{
      title: "Add Post",
      tabBarIcon: ({ color }) => <FontAwesome name='plus' size={24} color="black"/>,
    }}
    />
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
