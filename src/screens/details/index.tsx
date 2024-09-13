/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {DetailsScreenProps} from '../../../App';
import {Images} from '../../constants/images';
import {Modal} from 'react-native';
import {Rating} from 'react-native-ratings';
import {Rating as CommentRating} from '@rneui/themed';
import {Button} from 'react-native';
import {AppRootState, useAppDispatch, useAppSelector} from '../../hooks';
import {addComment} from '../../store/commentsSlice';
import {nanoid} from '@reduxjs/toolkit';
import {FlatList} from 'react-native-gesture-handler';
import CommentModal from './comments_modal';
import {DishDetail} from './dish_detail';

const DetailScreen = ({route}: DetailsScreenProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [authorText, setAuthorText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(0);

  const ratingCompleted = (rating: number) => {
    console.log('Rating is: ' + rating);
    setRating(rating);
  };
  const dispatch = useAppDispatch();
  const comments = useAppSelector(
    (state: AppRootState) => state.commentsList.comments,
  );

  return (
    <View style={styles.detailContainer}>
      <Image style={styles.menuImage} source={route.params.dishImage} />
      <Text style={styles.dishName}>{route.params.title}</Text>
      <Text style={styles.desc}>{route.params.desc}</Text>
      <View style={{marginTop: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={[
              styles.commentCircle,
              {backgroundColor: 'red', marginRight: 10},
            ]}>
            <Image
              source={Images.heart}
              style={styles.imageStyle}
            />
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={[styles.commentCircle, {backgroundColor: 'blue'}]}>
              <Image
                source={Images.edit}
                style={styles.imageStyle}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {newFunction()}
      <DishDetail comments={comments} dishId={route.params.id} />
    </View>
  );

  function newFunction() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.modalViewStyle}>
          <Rating
            showRating
            type="star"
            fractions={1}
            startingValue={3.6}
            imageSize={30}
            onFinishRating={ratingCompleted}
            style={{paddingVertical: 10}}
          />
          <TextInput
            style={[styles.textInputStyle, {height: 40}]}
            maxLength={20}
            placeholder="Author"
            onChangeText={newText => setAuthorText(newText)}
            defaultValue={authorText}
            underlineColorAndroid="transparent"
            keyboardType="default"
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Comment"
            multiline={true}
            numberOfLines={3}
            onChangeText={newText => setCommentText(newText)}
            defaultValue={commentText}
            underlineColorAndroid="transparent"
            keyboardType="default"
          />
          <View style={styles.modalButtonStyle}>
            <Button
              title="Submit"
              onPress={() => {
                dispatch(
                  addComment({
                    comment: commentText,
                    id: nanoid(),
                    name: authorText,
                    rating: rating,
                    dishId: route.params.id,
                  }),
                );
                setModalVisible(!modalVisible);
              }}
            />
          </View>
          <View style={styles.modalButtonStyle}>
            <Button
              title="Cancel"
              color="#696969"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
    );
  }
};

const styles = StyleSheet.create({
  detailContainer: {
    width: Dimensions.get('window').width,
    height: '100%',
    backgroundColor: 'white',
  },
  container: {
    margin: 10,
  },
  dishName: {
    margin: 10,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    overflow: 'visible',
  },
  desc: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 15,
    fontStyle: 'normal',
    color: 'black',
    overflow: 'visible',
  },
  menuImage: {
    width: Dimensions.get('window').width,
    height: 330,
    resizeMode: 'cover',
  },
  modalButtonStyle: {
    marginTop: 20,
  },
  ratingTextStyle: {
    textAlign: 'center',
    color: '#ffd700',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  textInputStyle: {
    borderColor: '#696969',
    borderRadius: 1,
    width: '100%',
    marginTop: 15,
    borderWidth: 1,
    borderTopLeftRadius: 8,
  },
  modalViewStyle: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
  },
  commentCircle: {
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 75,
  },
  imageStyle:{
    width: 25,
    height: 25,
    marginTop: 15,
    tintColor: 'white',
    alignItems: 'center',
  },
});
export default DetailScreen;
