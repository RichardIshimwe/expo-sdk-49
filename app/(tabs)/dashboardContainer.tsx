import {
  StyleSheet, 
  View, Text,  
  Animated,
  TouchableOpacity,
  Image, ActivityIndicator, Modal, TextInput } 
  from 'react-native';

import { useEffect, useState } from 'react';
import {  useFocusEffect } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { notifications } from '../../modal/notifications';
import { SwipeListView } from 'react-native-swipe-list-view';
import { getData } from '../../utils/getData';
import { Controller, useForm } from 'react-hook-form';

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

export default function DashboardContainer() {

 const [posts, setPosts] = useState<Post[]>([]);
 const [deleting, setDeleting] = useState(false);
 const [openModal, setOpenModal] = useState(false);
 const [addPostLoading, setAddPostLoading] = useState(false);
 const [postId, setPostId] = useState("");
 const [listData, setListData] = useState(
   notifications.map((notificationItem, index) => ({
     key: `${index}`,
     title: notificationItem.title,
     details: notificationItem.details
   })
 ));

 const fetchPosts = async () => {
  // setOpenModal(false);
  const userIn = getData("user").then((value) => {
    const user = JSON.parse(value!);
   const response = fetch('https://my-brand-cj08.onrender.com/blogs').then(res => res.json()).then(data => {
     const filteredData = data?.data?.filter((item : Post) => item.author === user?.data?.username)
     setPosts(filteredData);
   }).catch(err => console.log(err));
  }).catch(err => console.log(err))
 }

 const deletePost = async (id: string) => {
   setDeleting(true);
   const userIn = getData("user").then((value) => {
    const user = JSON.parse(value!);
   fetch(`https://my-brand-cj08.onrender.com/blogs/${id}`, {
     method: 'DELETE',
     headers: {
         'Authorization': `Bearer ${user?.data?.token}`,
       },
   })
   .then(response => response.json())
   .then(async resp => {
     setDeleting(false);
     await fetchPosts();
    }).catch(err => console.log(err))
  }).catch(err => console.log(err));
 }

 useFocusEffect(() => {
   fetchPosts();
 })

 useEffect(() => {
   fetchPosts();
 }, []);

 const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
  defaultValues: {
    title: "",
    description: ""
  }
});

 const onClose = (rowMap : any, rowKey : any) => {
  setPostId(rowKey.id); 
    setOpenModal(true); 
    reset({
      title: rowKey.title,
      description: rowKey.description  
    })
 }

 const onSubmit = (data: any) => {
  setAddPostLoading(true);
  const userIn = getData("user").then((value) => {
    const user = JSON.parse(value!);
   fetch(`https://my-brand-cj08.onrender.com/blogs/${postId}`, {
     method: 'PUT',
     headers: {
         'Authorization': `Bearer ${user?.data?.token}`,
         'Content-Type': 'application/json',
       },
     body: JSON.stringify(data),
   })
   .then(response => response.json())
   .then(async resp => {
    setAddPostLoading(false);
    setOpenModal(false);
     await fetchPosts();
    }).catch(err => console.log(err))
  }).catch(err => {
    console.log(err);
    setOpenModal(false);
    setAddPostLoading(false);
  });
 }

 const onDelete = (rowKey : any) => {
   // onClose(rowMap, rowKey);
   // const newData = [...listData];
   // const prevIndex = listData.findIndex(item => item.key === rowKey);
   // newData.splice(prevIndex, 1);
   // setListData(newData);
   deletePost(rowKey);
 }

 const transparent = "rgba(0,0,0,0.8)";

 const renderModal = () => {
  return(
    <Modal
    visible={openModal}
    animationType='slide'
    transparent={true}
    >
      <View
      style={{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: transparent
      }}
      >
        <View
        style={{
          width: "90%",
          height: "90%",
          backgroundColor: "white",
          borderRadius: 20,
          padding: 20
        }}
        >
          <TouchableOpacity onPress={() => setOpenModal(false)}>
            <Text>close</Text>
          </TouchableOpacity>
          <View className='flex items-center mt-[50px]'>
        <View className='w-[80%]'>
          <Text >Title</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
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
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                multiline={true}
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
            onPress={handleSubmit(onSubmit)}
            className='bg-black rounded-md mt-[20px] flex items-center justify-center h-[40px]'
          >
            {addPostLoading ? <ActivityIndicator animating={true} /> : <Text className='text-white font-bold'>Submit</Text>}
          </TouchableOpacity>
        </View>
      </View>
        </View>
      </View>
    </Modal>
  )
 }

 const VisibleItem = ({data} : {data : any}) => {
    return (
     <View style={styles.container_post}>
     <View style={styles.box_post}>
       <View style={styles.image_post}>
         <Image style={styles.myImage_post} source={{uri: data.item.image}} />
       </View>
       <View style={styles.content_post}>
         <Text style={styles.title_post}>{data.item.title}</Text>
         <Text style={styles.description_post}>{data.item.description.length > 80 ? `${data.item.description.slice(0, 80)}.....` : data.item.description}</Text>
         <Text style={styles.bySection_post}>
             <Text>By {data.item.author}</Text>
             <View style={{width: 20}}/>
             <Text>{`${new Date(data.item.createdAt).toISOString().split('T')[0]}`}</Text>
         </Text>
       </View>
     </View>
     </View>
    )
 }

 const renderItem = (data : any, rowMap : any) => {
    return(
     <VisibleItem data={data} />
    )
 }

 const HiddenItemWithActions = ({onClose , onDelete, data, rowMap} : {onClose: () => void, data: any ,rowMap: any, onDelete : () => void}) => {
   return (
     <View style={styles.rowBack}>
       <Text></Text>
       <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={onClose}>
         <View style={styles.trash}>
           <FontAwesome name="edit" size={24} color="black" />
         </View>
       </TouchableOpacity>
       <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={onDelete}>
         <Animated.View style={[styles.trash]}>
            {deleting ? <ActivityIndicator animating={true} /> : <FontAwesome name="trash" size={24} color="black" /> }
         </Animated.View>
       </TouchableOpacity>
     </View>
   )
 }

 const renderHiddenItem = (data : any, rowMap : any) => {
   return(
    <HiddenItemWithActions
    data={data} 
    rowMap={rowMap}
    onClose={() => onClose(rowMap, {id : data.item._id, title: data.item.title, description: data.item.description})}
    onDelete={() => onDelete(data.item._id)}
    />
   )
}

 return (
   <View style={styles.container}>
   <SwipeListView
    data={posts}
    keyExtractor={(item) => item._id}
    renderItem={renderItem}
    renderHiddenItem={renderHiddenItem}
    leftOpenValue={75}
    rightOpenValue={-150}
    disableRightSwipe
    rightActivationValue={-200}
    leftActivationValue={100}
    leftActionValue={0}
    rightActionValue={-500}
    onLeftAction={onClose}
   //  onRightAction={onClose}
    onRightAction={onDelete}
    />
    {renderModal()}
   </View>
 );
}

const styles = StyleSheet.create({


 container_post : {
   flex: 1,
   flexDirection: "row",
   justifyContent: "center", 
   alighItems: "center",
   backgroundColor: '#FFF',
   borderRadius: 5,
   margin: 5,
   marginBottom: 10,
   shadowColor: '#999',
   shadowOffset: {width: 0, height: 1},
   shadowOpacity: 0.8,
   shadowRadius: 2,
   elevation: 5,
},
box_post : {
   width: "95%",
   flexDirection: "row",
   height: 125,
   padding: 10,
},
image_post: {
   width: "40%",
   height: "100%"
},
myImage_post: {
   width: "100%",
   height: "100%",
   borderRadius: 8
},
content_post:{
   width: "60%",
   height: "100%",
   padding: 5
},
title_post: {
   fontSize: 16,
   fontWeight: "bold",
   textAlign: "left",
   marginBottom: 5,
   color: "black"
},
bySection_post: {
},
description_post: {
   textAlign: "left",
   color: "black"
},
 container: {
   backgroundColor: '#f4f4f4',
   flex: 1,
 },
 backTextWhite: {
   color: '#FFF',
 },
 rowFront: {
   backgroundColor: '#FFF',
   borderRadius: 5,
   height: 60,
   margin: 5,
   marginBottom: 15,
   shadowColor: '#999',
   shadowOffset: {width: 0, height: 1},
   shadowOpacity: 0.8,
   shadowRadius: 2,
   elevation: 5,
 },
 rowFrontVisible: {
   backgroundColor: '#FFF',
   borderRadius: 5,
   height: 60,
   padding: 10,
   marginBottom: 15,
 },
 rowBack: {
   alignItems: 'center',
   backgroundColor: '#DDD',
   flex: 1,
   flexDirection: 'row',
   justifyContent: 'space-between',
   paddingLeft: 15,
   margin: 5,
   marginBottom: 15,
   borderRadius: 5,
 },
 backRightBtn: {
   alignItems: 'flex-end',
   bottom: 0,
   justifyContent: 'center',
   position: 'absolute',
   top: 0,
   width: 75,
   paddingRight: 17,
 },
 backRightBtnLeft: {
   backgroundColor: '#1f65ff',
   right: 75,
 },
 backRightBtnRight: {
   backgroundColor: 'red',
   right: 0,
   borderTopRightRadius: 5,
   borderBottomRightRadius: 5,
 },
 trash: {
   height: 25,
   width: 25,
   marginRight: 7,
 },
 title: {
   fontSize: 14,
   fontWeight: 'bold',
   marginBottom: 5,
   color: '#666',
 },
 details: {
   fontSize: 12,
   color: '#999',
 },
});