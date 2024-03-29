import { Stack, router } from 'expo-router';
import { useCallback, useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Platform, ActivityIndicator, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TopNavigationImageTitleShowcase } from '../../components/TopNavigation';
import * as ImagePicker from "expo-image-picker";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { pushNotification } from '../../utils/pushNotification';
import { getData } from '../../utils/getData';
// import { blurhash } from '../singlePost';
// import { Image } from 'expo-image';
import { DissmissKeyboardView } from '../../components/DissmissKeyBoard';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [addPostLoading, setAddPostLoading] = useState(false);
  const FormData = global.FormData;
  const [image, setImage] = useState("");
  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      description: ""
    }
  });
  const onSubmit = (data: any) => {
    setAddPostLoading(true);
    const userIn = getData("user").then((value) => {
      const user = JSON.parse(value!);
      if (!image || data.title == "" || data.author == "" || data.description == "") {
        alert("please fill all fields");
        setAddPostLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: 'photo.jpg',
      } as any);
      formData.append('title', data.title);
      formData.append('author', user?.data?.token.username);
      formData.append('description', data.description);
      fetch('https://my-brand-cj08.onrender.com/blogsNotProtected', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user?.data?.token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => {
          pushNotification({
            to: expoPushToken,
            sound: 'default',
            title: 'Original Title',
            body: "obstacle was created successfully",
            data: { someData: 'goes here' },
          })
          reset({
            title: "",
            description: ""
          });
          setImage("");
          setAddPostLoading(false);
          return;
        }).catch(err => {
          console.log(err);
          pushNotification({
            to: expoPushToken,
            sound: 'default',
            title: 'Original Title',
            body: `error occured ${err}`,
            data: { someData: 'goes here' },
          })
        });

    }).catch(err => console.log(err));

  };

  const onChange = (arg: { nativeEvent: { text: any; }; }) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  const selectFile = async () => {
    console.log("selecting file");
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result); 
      if (!result.canceled) {
        setImage(result.assets[0].uri)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
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
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return token;
  }

  return (
    <DissmissKeyboardView>
    <View className='h-screen bg-whiteBg'>
      <TopNavigationImageTitleShowcase title="Add Posts" />
      <Stack.Screen options={{ headerShown: false }} />
      <View className='flex items-center mt-[50px]'>
        <View className='w-[80%]'>
          <Text >Title</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{
                backgroundColor: '#FFF',
                borderRadius: 5,
                padding: 10,
                marginBottom: 10,
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
            name="title"
            rules={{ required: true }}
          />
          <Text className=''>description</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                multiline={true}
                // className='bg-red-300 h-[100px] p-2 rounded-md'
                style={{
                  backgroundColor: '#FFF',
                  borderRadius: 5,
                  padding: 10,
                  marginBottom: 10,
                  shadowColor: '#999',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 5,
                  height: 100
                }}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="description"
            rules={{ required: true }}
          />
          <TouchableOpacity
            // className='bg-red-300 h-[40px] p-2 rounded-md mt-[10px]'
            style={{
              backgroundColor: '#FFF',
              borderRadius: 5,
              padding: 10,
              marginTop: 10,
              shadowColor: '#999',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}
            onPress={selectFile}
          >
            <Text>Upload images</Text>
          </TouchableOpacity>
          <View className='mt-[10px]'>
            {image &&
            //  <View className='flex-1 justify-center items-center h-[400px] w-[400px]'>
              <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
            // </View>
            }
          </View>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className='bg-black rounded-md mt-[20px] flex items-center justify-center h-[40px]'
          >
            {addPostLoading ? <ActivityIndicator animating={true} /> : <Text className='text-white font-bold'>Submit</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </DissmissKeyboardView>
  );
};
