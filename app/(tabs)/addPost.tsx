import { Stack } from 'expo-router';
import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Image  } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TopNavigationImageTitleShowcase } from '../../components/TopNavigation';
// import DocumentPicker from 'react-native-document-picker';
import * as ImagePicker from "expo-image-picker";

export default () => {
    const FormData = global.FormData;
    interface ImageData {
        assetId: null | string;
        base64: null | string;
        duration: null | number;
        exif: null | any; // Replace 'any' with the actual type if you have a specific structure for 'exif'
        height: number;
        rotation: null | number;
        type: string;
        uri: string;
        width: number;
      }
    const [image, setImage] = React.useState("");
    // const [image, setImage] = React.useState<ImageData>();
  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      author: "",
      description: ""
    }
  });
  const onSubmit = (data: any) => {
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
        // fetch('http://localhost:4000/blogs', {
        method: 'POST',
        headers: {
            'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im15IiwiYWRtaW4iOmZhbHNlLCJpYXQiOjE3MDQxODMxNjh9.vOq5OjzRHikWI-t7e2B-fnPVYosgwNs1iHotiXLNCmk",
            'Content-Type': 'multipart/form-data',
          },
        body: formData,
      })
      .then(response => {
        console.log("response : ");
        console.log(response);
    }).catch(err => console.log(err))
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
     console.log("this is the selected image")
     console.log(result);
     if(!result.canceled) {
        console.log("this is the selected image")
        console.log(result);
        console.log("this is the selected image array of zero")
        console.log(result.assets[0]);
        setImage(result.assets[0].uri)
     }

    } catch (error) {
        console.log(error);
    }
  }

  console.log('errors', errors);

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
      <View className='mt-[40px] rounded-md'>
        <Button
          color={'#ec5990'}
          title="Submit"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      </View>
      </View>
    </View>
  );
};
