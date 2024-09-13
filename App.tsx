/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigation from './src/navigation/drawerNavigation';
import DetailScreen from './src/screens/details';

const Stack = createStackNavigator<RootStackParamList>();

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StoreProvider} from './src/storeprovider';

export type RootStackParamList = {
  Detail: {dishImage: any; title: string; desc: string; id: string};
  Root: undefined;
};

export type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Detail'
>;

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={DrawerNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{title: 'Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// export default App;

export default () => {
  return (
    <StoreProvider>
      <App />
    </StoreProvider>
  );
};
