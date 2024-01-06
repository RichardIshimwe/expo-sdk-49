import { StyleSheet, FlatList, View, Text,ScrollView } from 'react-native';

import BoxContainer from '../../components/BoxContainer';
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';

export   type Post = {
  _id: string,
  author: string,
  title: string,
  description: string,
  image: string,
  comments: [],
  createdAt: string,
  __v: 0
}

export default function AllPosts() {

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://my-brand-cj08.onrender.com/blogs').then(res => res.json()).then(data => {
        setPosts(data?.data);
      }).catch(err => console.log(err));
    }
    fetchPosts();
  }, []);

  return (
    <View>
      <ScrollView>
      <Stack.Screen options={{headerShown: false}} />
      {posts?.length > 0 ?posts.map(item => (<BoxContainer key={item._id} item={item}/>)) : <Text>Loading...</Text>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
