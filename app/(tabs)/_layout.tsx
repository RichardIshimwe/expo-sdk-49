import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, useColorScheme, StyleSheet, View } from 'react-native';

import React from 'react';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';

import Container from '.';
// import TabOneScreen from '.';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme(); 

  return (
    <React.Fragment >
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light} >
      {/* <Layout> */}
      <View style={styles.container}>
      <Container />
      </View>
      {/* </Layout> */}
    </ApplicationProvider>
  </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    marginTop: 40,
  }
})
