import {View, Text, StyleSheet} from 'react-native';

import Box from '../../components/Box';
import Home from './home';
import { BottomBar } from '../../components/BottomBar';
import AllPosts from './allPosts';

export default function Container(){
  return(
    <View style={{flex:1,backgroundColor: "#f8f8f8"}}>
    <View style={styles.container}>
       <Home />
       <AllPosts />
       {/* <BottomBar /> */}
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 40,
    backgroundColor: "#f8f8f8",
  }
})












// import {View, Text, StyleSheet} from 'react-native';

// import Box from '../../components/Box';

// export default function TabOneSceren(){
//   return(
//     <View style={styles.container}>
//      <Box style={{backgroundColor: "#8e9b00"}}>Box 1</Box>
//      <Box style={{backgroundColor: "#b65d1f"}}>Box 2</Box>
//      <Box style={{backgroundColor: "#1c4c56"}}>Box 3</Box>
//      <Box style={{backgroundColor: "#ab9156"}}>Box 4</Box>
//      <Box style={{backgroundColor: "#6b0803"}}>Box 5</Box>
//      <Box style={{backgroundColor: "#1c4c56"}}>Box 6</Box>
//      <Box style={{backgroundColor: "#b95f21"}}>Box 7</Box>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container:{
//     marginTop: 30,
//     borderWidth: 6,
//     borderColor: "red"
//   }
// })


