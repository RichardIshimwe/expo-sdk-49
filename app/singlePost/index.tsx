import { Link, router, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image } from "expo-image";
import { Text, TouchableOpacity, View, SafeAreaView, ActivityIndicator, StyleSheet, TextInput, Button, keyboard } from 'react-native';
import { getData } from '../../utils/getData';
import { storeData } from '../../utils/storeData';
import AllPosts from '../(tabs)/allPosts';
import { PostType } from '../(tabs)/allPosts';
import { DissmissKeyboardView } from '../../components/DissmissKeyBoard';

export const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


export default function TestTab() {

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>();
  const [addPostLoading, setAddPostLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [post, setPost] = useState<PostType>();
  const { id } = useLocalSearchParams();

  const {handleSubmit, reset, control, formState : {errors}} = useForm({
    defaultValues:{
      comment: ""
    }
  });

  const onSubmit = (data : any) => {
    console.log(data);
    console.log(user);
    console.log(post);
    fetch(`https://my-brand-cj08.onrender.com/comment/${post?._id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user?.data?.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        console.log(response);
        reset({
         comment: ""
        });
        setAddPostLoading(false);
        fecthBlog();
        return;
      }).catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    getData('user').then((value) => {
      const user = JSON.parse(value!);
      console.log(user?.data?.token);
      setUser(user);
      fecthBlog();
    })

  }, []);

  const fecthBlog = async () => {
    setIsLoading(true);
    try {
      const response = fetch(`https://my-brand-cj08.onrender.com/blogs/${id}`, {
        method: 'GET',
        headers: {
          // 'Authorization': `Bearer ${user?.data?.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => response.json())
        .then(json => {
          setPost(json.data);
          console.log(json.data)
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setErrorMessage(error.message);
          throw new Error(`Unable to login : ${error}`)
        });

    } catch (error: any) {
      console.error('Error:', error.message);
    }
  };

  return (
  <DissmissKeyboardView>
    <SafeAreaView >
      <View className='h-screen'>
        <TouchableOpacity
          className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4 w-[80px]">
          <Text className="text-xl font-bold text-center text-gray-700"><Link href="/(tabs)/dashboard">Back</Link></Text>
        </TouchableOpacity>
        {!isLoading ? (post ? <View className='flex items-center p-[10px]'>
          {post.image ? <View className='h-[300px] w-[100%] bg-black rounded-xl'>
            <View className='flex-1 justify-center items-center'>
              <Image
                className='flex-1 w-full h-full rounded-xl'
                source={post.image}
                placeholder={blurhash}
                contentFit="cover"
                transition={1000}
              />
            </View>
          </View> : null}
          <View>
            <Text className='pt-2 pb-2 font-bold text-lg'>{post.title}</Text>
            <Text>{post.description}</Text>
          </View>
        </View> : <Text>Post not found return to the home page</Text>) : <View className='h-screen pt-[90px]'><ActivityIndicator animating={true} /></View>}
        <View className='flex justify-center m-[10px]'>
          <View>
            <View>
            {post && post?.comments.length > 0 ? <View>
              <Text className='mb-1 text-lg'>
                  Comments Section : 
              </Text>
              {post?.comments.map((comment : {name: string, comment: string}) => <View className='border-2 border-black p-1 rounded-lg mb-1'>
                <View>
                 <Text className='font-bold text-black text-lg'>
                  {comment?.name}
                 </Text>
                </View>
                <View>
                 <Text>
                  {comment?.comment}
                 </Text>
                </View>
                <View></View>
              </View>)}
            </View> : <Text className='mb-1 text-lg'>
                  no comments available 
              </Text>}
            <Controller 
            control={control}
            render= {({field : {onChange, onBlur, value}}) => (
              <TextInput 
              multiline={true}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              className='flex w-full h-[70px] border-2 border-gray-400 rounded-xl p-2'
              placeholder='Leave a comment or suggestion'
            />
            )}
            name="comment"
            rules={{required: true}}
            />
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className='bg-black rounded-md mt-[20px] flex items-center justify-center h-[40px]'
          >
            {addPostLoading ? <ActivityIndicator animating={true} /> : <Text className='text-white font-bold'>Leave a comment</Text>}
          </TouchableOpacity>
          </View>
          </View>
       </View>
      </View>
    </SafeAreaView>
  </DissmissKeyboardView>
  );
}
