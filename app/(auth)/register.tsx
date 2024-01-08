import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View, Image, SafeAreaView, ActivityIndicator } from 'react-native';

export default function TestTab() {

    const [isLoading, setIsLoading] = useState(false);

    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
          email: "",
          password: "",
          confirmPassword: "",
          userName: ""
        }
      });
      const onSubmit = async (data: any) => {
        console.log("all data", data);
    
        try {
            const response = await fetch(`https://my-brand-cj08.onrender.com/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email:data.email,
                    username:data.userName,
                    password:data.password,
                    confirmPassword:data.confirmPassword
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const resp = await response.json();
            console.log(resp);
    
        } catch (error : any) {
            console.error('Error:', error.message);
        }
    };
    

  return (
  <View className='bg-red-300'>
   <View  className="flex">
        <SafeAreaView className="flex-row justify-start">
          <TouchableOpacity 
            
          className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <Text className="text-xl font-bold text-center text-gray-700"><Link href="/(tabs)/dashboard">Back</Link></Text> 
          </TouchableOpacity>
          </SafeAreaView>
        <View  className="flex-row justify-center">
          <Image source={{uri: "https://raw.githubusercontent.com/syednomishah/Login-SignUp-UI-React-Native/main/assets/images/login.png"}}  style={{width: 200, height: 200}} />
        </View>
      </View>
      <View 
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}} 
         className="bg-white mt-8 pt-8 px-8">
          <View className="form space-y-2">
          <View className='flex items-center'>
    <View className='w-[80%]'>
      <Text >Email</Text>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            className='bg-red-300 h-[40px] p-2 rounded-md'
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="email"
        rules={{ required: true }}
      />
        <Text >Username</Text>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            className='bg-red-300 h-[40px] p-2 rounded-md'
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="userName"
        rules={{ required: true }}
      />
      <Text >Password</Text>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            className='bg-red-300 h-[40px] p-2 rounded-md'
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="password"
        rules={{ required: true }}
      />
            <Text >Confirm Password</Text>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            className='bg-red-300 h-[40px] p-2 rounded-md'
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="confirmPassword"
        rules={{ required: true }}
      />
      </View>
      </View>
      </View>
            <TouchableOpacity 
              onPress={handleSubmit(onSubmit)}
              className="py-3 bg-yellow-400 rounded-xl mt-4">
                <Text 
                    className="text-xl font-bold text-center text-gray-700"
                >
                        {isLoading ? <ActivityIndicator animating={true} /> : <Text className='text-xl font-bold text-center text-gray-700'>Register</Text>}
                </Text>
             </TouchableOpacity>
          </View>
          <View className="flex-row justify-center pt-5 bg-white h-screen">
              <Text className="text-gray-500 font-semibold">
                  Already have an account?
              </Text>
              <TouchableOpacity>
                  <Text className="font-semibold text-yellow-500"><Link href="/sign-in">Login</Link></Text>
              </TouchableOpacity>
          </View>
          
      </View>
  );
}
