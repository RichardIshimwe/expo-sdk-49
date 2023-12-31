import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router';

export default function Blog() {

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
     const fetchUsers = async () => {
      const response = await fetch('https://puce-helpful-xerus.cyclic.app/blogs')
      // const response = await fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setAllUsers(data)});
     }
     fetchUsers();
  }, []);


  return (
    <View style={styles.container}>
        <Link href="/two" >this is the blog model, i mean a good one</Link>
      {/* <Text style={styles.title}>Bloging Page</Text>
      <Link href="/blog" >Go to blogs</Link>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      {/* <Text>{JSON.stringify(allUsers)}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
