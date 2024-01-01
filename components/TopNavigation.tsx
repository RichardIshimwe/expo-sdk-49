import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar,
  Icon,
  IconElement,
  MenuItem,
  OverflowMenu,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';


const MenuIcon = (props: any): IconElement => (
  <Icon
    {...props}
    name='more-vertical'
  />
);

const InfoIcon = (props: any): IconElement => (
  <Icon
    {...props}
    name='info'
  />
);

const LogoutIcon = (props: any): IconElement => (
  <Icon
    {...props}
    name='log-out'
  />
);

export const TopNavigationImageTitleShowcase = ({title}: {title: string}): React.ReactElement => {

  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = (): void => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={toggleMenu}
    />
  );

  const renderOverflowMenuAction = (): React.ReactElement => (
    <OverflowMenu
      anchor={renderMenuAction}
      visible={menuVisible}
      onBackdropPress={toggleMenu}
    >
      <MenuItem
        accessoryLeft={InfoIcon}
        title='About'
      />
      <MenuItem
        accessoryLeft={LogoutIcon}
        title='Logout'
      />
    </OverflowMenu>
  );

  const renderTitle = (props: any): React.ReactElement => (
    <View style={styles.titleContainer}>
      {/* <Avatar
        style={styles.logo}
        source={require('../../assets/icon.png')}
      /> */}
      <Text {...props} style={styles.name}>
        {title}
      </Text>
    </View>
  );

  return (
    <TopNavigation
      title={renderTitle}
      accessoryRight={renderOverflowMenuAction}
      style={{backgroundColor: "#2d4059", borderBottomRightRadius: 10, borderBottomLeftRadius: 10}}
    />
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    marginHorizontal: 16,
  },
  name: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24
  }
});