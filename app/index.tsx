import { Link, router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image } from "expo-image";
import { blurhash } from './singlePost';
import { Text, TextInput, TouchableOpacity, View, SafeAreaView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeData } from '../utils/storeData';
import { getData } from '../utils/getData';
import { DissmissKeyboardView } from '../components/DissmissKeyBoard';

export default function TestTab() {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getData('user').then((value) => {
      const user = JSON.parse(value!);
      if (user?.data?.token) {
        router.push("/(tabs)/home");
      }
    })
  }, []);

  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  });
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://my-brand-cj08.onrender.com/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })
        .then(response => response.json())
        .then(json => {
          setIsLoading(false);
          const userIn = JSON.stringify(json);
          if (json.data) {
            storeData("user", userIn);
            router.push("/(tabs)/home")
          } else {
            reset(
              {
                email: "",
                password: "",
              }
            );
            setErrorMessage(json.message);
          }
        })
        .catch((error) => {
          console.log(error);
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
    <View className='bg-whiteBg'>
      <View className="flex">
        <SafeAreaView className="flex-row justify-start">
          <TouchableOpacity

            className="bg-topBd p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <Text className="text-xl font-bold text-center text-white"><Link href="/(tabs)/dashboard">Back</Link></Text>
          </TouchableOpacity>
        </SafeAreaView>
        <View className="flex-row justify-center">
          <View className='flex-1 justify-center items-center'>
            <Image
              className='flex-1 w-[200px] h-[200px]'
              source="https://raw.githubusercontent.com/syednomishah/Login-SignUp-UI-React-Native/main/assets/images/login.png"
              placeholder={blurhash}
              contentFit="cover"
              transition={1000}
            />
          </View>
        </View>
      </View>
      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="bg-white mt-8 pt-8 px-8">
        <View className="form space-y-2">
          <View className='flex items-center'>
            <View className='w-[80%]'>
              <Text >Email</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    // className='bg-red-300 h-[40px] p-2 rounded-md'
                    style={{
                      backgroundColor: '#FFF',
                      borderRadius: 5,
                      padding: 10,
                      marginTop: 10,
                      shadowColor: '#999',
                      shadowOffset: {width: 0, height: 1},
                      marginBottom: 10,
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 5,
                    }}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    keyboardType='email-address'
                  />
                )}
                name="email"
                rules={{ required: true }}
              />
              <Text >Password</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    // className='bg-red-300 h-[40px] p-2 rounded-md'
                    style={{
                      backgroundColor: '#FFF',
                      borderRadius: 5,
                      padding: 10,
                      // marginTop: 10,
                      shadowColor: '#999',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 5,
                    }}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                  />
                )}
                name="password"
                rules={{ required: true }}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="py-3 bg-black rounded-xl mt-4">
          <Text
            className="text-xl font-bold text-center text-gray-700"
          >
            {isLoading ? <Text className='text-xl font-bold text-center text-white'> <ActivityIndicator animating={true} /> </Text> : <Text className='text-xl font-bold text-center text-white'>Login</Text>}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center pt-5 bg-white">
        <Text className="text-gray-500 font-semibold">
          Don't have an account?
        </Text>
        <TouchableOpacity>
          <Text className="font-semibold text-gray-700"><Link href="/register">Sign Up</Link></Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center pt-5 bg-white h-screen">
        <Text className="font-semibold text-red-500">{errorMessage}</Text>
      </View>
    </View>
    </DissmissKeyboardView>
  );
}
