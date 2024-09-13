import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/home';
import ContactUs from '../screens/contact_us';
import AboutUs from '../screens/contact_us';

type RootDrawerParamList = {
  Home: undefined;
  ContactUs: undefined;
  AboutUs: undefined;
};
const Drawer = createDrawerNavigator<RootDrawerParamList>();

function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Drawer.Screen name="ContactUs" component={ContactUs} options={{ title: 'Contact Us' }} />
      <Drawer.Screen name="AboutUs" component={AboutUs} options={{ title: 'About Us' }} />
    </Drawer.Navigator>
  );
}
export default DrawerNavigation;
