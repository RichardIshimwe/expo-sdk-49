import { Stack, Redirect } from 'expo-router';
import {useCallback, useState, useEffect} from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Image, Platform  } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TopNavigationImageTitleShowcase } from '../../components/TopNavigation';
import * as ImagePicker from "expo-image-picker";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { pushNotification } from '../../utils/pushNotification';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default () => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const FormData = global.FormData;
    const [image, setImage] = useState("");
    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      author: "",
      description: ""
    }
  });
  const onSubmit = (data: any) => {
    console.log(data);
    // alert("hey alert");
    // alert(JSON.stringify(data));
    const formData = new FormData();
    formData.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: 'photo.jpg',
      } as any);
    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('description', data.description);
    fetch('https://my-brand-cj08.onrender.com/blogsNotProtected', {
        method: 'POST',
        headers: {
            'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im15IiwiYWRtaW4iOmZhbHNlLCJpYXQiOjE3MDQxODMxNjh9.vOq5OjzRHikWI-t7e2B-fnPVYosgwNs1iHotiXLNCmk",
            'Content-Type': 'multipart/form-data',
          },
        body: formData,
      })
      .then(response => {
        console.log("redirecting to all posts");
        pushNotification({
          to: expoPushToken,
          sound: 'default',
          title: 'Original Title',
          body: "obstacle was created successfully",
          data: { someData: 'goes here' },
        })
        return <Redirect href="/(tabs)/allPosts" />
    }).catch(err => 
      {
        console.log(err);
        pushNotification({
          to: expoPushToken,
          sound: 'default',
          title: 'Original Title',
          body: `error occured ${err}`,
          data: { someData: 'goes here' },
  })
      })
  };

  const onChange = (arg: { nativeEvent: { text: any; }; }) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  const selectFile = async () => {
    try {
     await ImagePicker.requestMediaLibraryPermissionsAsync();
     let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
     });
     if(!result.canceled) {
        setImage(result.assets[0].uri)
     }

    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    console.log(" registering for react push notification application..");
    registerForPushNotificationsAsync().then(token => {
      console.log(token);
      setExpoPushToken(token as string);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (await Notifications.getExpoPushTokenAsync({ projectId: '4c3a2181-38be-4bd6-8cfc-29f165f1108f' })).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }

  return (
    <View className='h-screen bg-green-400'>
    <TopNavigationImageTitleShowcase title="Add Posts"/>
    <Stack.Screen options={{headerShown: false}} />
    <View className='flex items-center'>
    <View className='w-[80%]'>
      <Text >Author</Text>
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
        name="author"
        rules={{ required: true }}
      />
      <Text >Title</Text>
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
        name="title"
        rules={{ required: true }}
      />
      <Text className=''>description</Text>
      <Controller
        control={control}
         render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            className='bg-red-300 h-[100px] p-2 rounded-md'
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="description"
        rules={{ required: true }}
      />
      <TouchableOpacity
       className='bg-red-300 h-[40px] p-2 rounded-md mt-[10px]'
       onPress={selectFile}
      >
        <Text>Upload images</Text>
      </TouchableOpacity>
      <View className='mt-[10px]'>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
      <View className='mt-[40px] rounded-md bg-black'>
        <Button
          color={'#ec5990'}
          title="Submit"
          onPress={handleSubmit(onSubmit)}
        />
        <Button title='send push notification' onPress={() => pushNotification({
                to: expoPushToken,
                sound: 'default',
                title: 'Original Title',
                body: 'My new Notification',
                data: { someData: 'goes here' },
        })} />
      </View>
      </View>
      </View>
    </View>
  );
};
