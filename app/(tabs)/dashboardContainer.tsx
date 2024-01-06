// import { StyleSheet, FlatList, View, Text,ScrollView } from 'react-native';

// import DasboardBox from '../../components/DashboardBox';
// import { useEffect, useState } from 'react';
// import { Stack } from 'expo-router';
// import { TopNavigationImageTitleShowcase } from '../../components/TopNavigation';

// import { SwipeListView } from 'react-native-swipe-list-view';

// export   type Post = {
//   _id: string,
//   author: string,
//   title: string,
//   description: string,
//   image: string,
//   comments: [],
//   createdAt: string,
//   __v: 0
// }

// export default function DashboardContainer() {

//   const [posts, setPosts] = useState<Post[]>([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const response = await fetch('https://my-brand-cj08.onrender.com/blogs').then(res => res.json()).then(data => {
//         setPosts(data?.data);
//       }).catch(err => console.log(err));
//     }
//     fetchPosts();
//   }, []);

//   return (
//     <View>
//       <ScrollView>
//       {posts?.length > 0 ?posts.map(item => (<DasboardBox key={item._id} item={item}/>)) : <Text>Loading...</Text>}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });

import {
   StyleSheet, 
   FlatList, 
   View, Text,ScrollView,  
   Animated,
   TouchableHighlight,
   TouchableOpacity,
   StatusBar, } 
   from 'react-native';

import DasboardBox from '../../components/DashboardBox';
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { TopNavigationImageTitleShowcase } from '../../components/TopNavigation';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { notifications } from '../../modal/notifications';
import { SwipeListView } from 'react-native-swipe-list-view';

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
  const [listData, setListData] = useState(
    notifications.map((notificationItem, index) => ({
      key: `${index}`,
      title: notificationItem.title,
      details: notificationItem.details
    })
  ));

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://my-brand-cj08.onrender.com/blogs').then(res => res.json()).then(data => {
        setPosts(data?.data);
      }).catch(err => console.log(err));
    }
    fetchPosts();
  }, []);

  const onClose = (rowMap : any, rowKey : any) => {
     if(rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
     }
  }

  const onDelete = (rowMap : any, rowKey : any) => {
    onClose(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  }

  const VisibleItem = ({data} : {data : any}) => {
    console.log(data);
     return (
      <View style={styles.rowFront}>
      <TouchableHighlight 
      style={styles.rowFrontVisible}
      >
        <View>
          <Text style={styles.title} numberOfLines={1}>{data.item.title}</Text>
          <Text style={styles.details} numberOfLines={1}>{data.item.details}</Text>
        </View>
      </TouchableHighlight>
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
        <Text>Left</Text>
        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={onClose}>
          <View style={styles.trash}>
            <FontAwesome name="edit" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={onDelete}>
          <Animated.View style={[styles.trash]}>
             <AntDesign name="delete" size={24} color="black" />
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
     onClose={() => onClose(rowMap, data.item.key)}
     onDelete={() => onDelete(rowMap, data.item.key)}
     />
    )
 }

  return (
    <View style={styles.container}>
    <SwipeListView
     data={listData}
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
    </View>
  );
}

const styles = StyleSheet.create({
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