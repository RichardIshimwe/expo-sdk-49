import { StyleSheet, FlatList, View, Text,ScrollView } from 'react-native';

import { Stack } from 'expo-router';
import { TopNavigationImageTitleShowcase } from '../../components/TopNavigation';

export default function AddPost() {

  return (
    <View>
      <ScrollView>
         <Stack.Screen options={{headerShown: false}} />
         <TopNavigationImageTitleShowcase title="Add Post"/>
          <View className='bg-red-300'>
           <Text className='font-bold'>Add Post</Text>
          </View>
      </ScrollView>
    </View>
  );
}