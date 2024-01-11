import { StyleSheet, FlatList, View, Text,ScrollView, ActivityIndicator } from 'react-native';

import BoxContainer from '../../components/BoxContainer';
import { useEffect, useState } from 'react';
import { Stack, router, useFocusEffect } from 'expo-router';

export   type PostType = {
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

  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false)

  const fetchPosts = async () => {
    console.log("fetching posts");
    setLoading(false);
    const response = await fetch('https://my-brand-cj08.onrender.com/blogs').then(res => res.json()).then(data => {
      setPosts(data?.data);
      setLoading(false);
    }).catch(err => console.log(err));
  }

  useFocusEffect(() => {
    fetchPosts();
  })

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePressable = (id : string) => {
    router.push({pathname: `/singlePost/`, params: {id: id}});
    // router.push(`/singlePost/${id}`);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      <Stack.Screen options={{headerShown: false}} />
      {posts.length > 0 ? posts.map(item => (<BoxContainer onPress={() => handlePressable(item._id)} key={item._id} item={item}/>)) : <View className='h-screen pt-[90px]'><ActivityIndicator animating={true} /></View>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  }});
