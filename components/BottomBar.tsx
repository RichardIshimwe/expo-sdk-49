import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationTab, Icon, IconElement } from '@ui-kitten/components';
import { Link } from 'expo-router';

const PersonIcon = (props : any): IconElement => (
  <Icon
    {...props}
    name='person-outline'
  />
);

const BellIcon = (props : any): IconElement => (
  <Icon
    {...props}
    name='bell-outline'
  />
);

const EmailIcon = (props : any): IconElement => (
  <Icon
    {...props}
    name='email-outline'
  />
);

export default function BottomBar(): React.ReactElement {

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <BottomNavigation
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
    >
      <BottomNavigationTab
        icon={PersonIcon}
        title='USERS'
        onPress={() => (<Link href="../allPosts" />)}
      />
      <BottomNavigationTab
        icon={BellIcon}
        title='ORDERS'
        onPress={() => (<Link href="/allPostsr" />)}
      />
      <BottomNavigationTab
        icon={EmailIcon}
        title='TRANSACTIONS'
        onPress={() => (<Link href="/allPostsr" />)}
      />
    </BottomNavigation>
  );
};


// import { View, StyleSheet, Text } from "react-native";

// export function BottomBar() {
//     return (
//         <View style={styles.constainer}>
//             <View style={styles.box}><Text>This is bottom bar</Text></View>
//         </View>)
    
// }

// const styles = StyleSheet.create({
//     constainer: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         backgroundColor: "white",
//         padding: 10
//     },
//     box: {
//         backgroundColor: "brown",
//         padding: 10
//     }
// }
// )
