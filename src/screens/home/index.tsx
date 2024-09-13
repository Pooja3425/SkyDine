/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Images} from '../../constants/images';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';

function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const menuItems = [
    {
      dish_image: Images.dish1,
      dish_name: 'Paneer Butter Masala',
      desc: 'a rich and creamy dish of paneer (Indian cottage cheese) in a tomato, butter and cashew sauce that is known here as “makhani gravy.” ',
      id: '1',
    },
    {
      dish_image: Images.dish2,
      dish_name: 'kadhai Paneer',
      desc: 'a rich and creamy dish of paneer (Indian cottage cheese) in a tomato, butter and cashew sauce that is known here as “makhani gravy.” ',
      id: '2',
    },
    {
      dish_image: Images.dish4,
      dish_name: 'Mashroom Masala',
      desc: 'a rich and creamy dish of paneer (Indian cottage cheese) in a tomato, butter and cashew sauce that is known here as “makhani gravy.” ',
      id: '3',
    },
    {
      dish_image: Images.dish5,
      dish_name: 'Palak Paneer',
      desc: 'a rich and creamy dish of paneer (Indian cottage cheese) in a tomato, butter and cashew sauce that is known here as “makhani gravy.” ',
      id: '4',
    },
    {
      dish_image: Images.dish6,
      dish_name: 'Paneer Biryani',
      desc: 'a rich and creamy dish of paneer (Indian cottage cheese) in a tomato, butter and cashew sauce that is known here as “makhani gravy.” ',
      id: '5',
    },
  ];

  type ItemProps = {title: string; dishImage: any; desc: string; id: string};

  // eslint-disable-next-line react/no-unstable-nested-components
  const Item = ({title, dishImage, desc, id}: ItemProps) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Detail', {dishImage, desc, title, id})
      }>
      <View style={styles.container}>
        <Image source={dishImage} style={styles.menuImage} />
        <View style={{marginRight: 10, flex: 1}}>
          <Text style={styles.dishName}>{title}</Text>
          <Text style={styles.desc}>{desc}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={menuItems}
        renderItem={({item}) => (
          <Item
            title={item.dish_name}
            dishImage={item.dish_image}
            desc={item.desc}
            id={item.id}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    height: 150,
    // width: Dimensions.get('screen').width / 2.1,
    backgroundColor: 'white',
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    margin: 10,
    borderRadius: 5,
    direction: 'ltr',
  },
  dishName: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    overflow: 'visible',
    marginTop:10,
  },
  desc: {
    fontSize: 12,
    fontStyle: 'normal',
    color: 'black',
    overflow: 'visible',
  },
  menuImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    marginRight: 10,
  },
});
export default HomeScreen;
