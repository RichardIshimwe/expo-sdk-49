import {View, Text, StyleSheet} from 'react-native';

import Box from '../../components/Box';
import Home from './home';
import BottomBar from '../../components/BottomBar';
import AllPosts from './allPosts';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function Container(){
  return(
    <View style={{flex:1,backgroundColor: "#f8f8f8"}}>
    <View style={styles.container}>
       <Home />
       <AllPosts />
       <BottomBar />
    </View>
    </View>
  //   <Tab.Navigator>
  //   <Tab.Screen name="home" component={Home} />
  //   <Tab.Screen name="Settings" component={AllPosts} />
  // </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 40,
    backgroundColor: "#f8f8f8",
  }
})
