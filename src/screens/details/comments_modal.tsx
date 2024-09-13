/* eslint-disable react/react-in-jsx-scope */
import {nanoid} from '@reduxjs/toolkit';
import {Rating} from '@rneui/themed';
import {
  Button,
  Dimensions,
  Modal,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {addComment} from '../../store/commentsSlice';
import {useState} from 'react';
import {useAppDispatch} from '../../hooks';

type CommentsComponentProps = {
  modalVisible: boolean;
  dishId: string;
};

const CommentModal: React.FunctionComponent<CommentsComponentProps> = (
  props: CommentsComponentProps,
) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [authorText, setAuthorText] = useState('');
  const [commentText, setCommentText] = useState('');
  const dispatch = useAppDispatch();
  const ratingCompleted = (rating: number) => {
    console.log('Rating is: ' + rating);
    setRating(rating);
  };
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.modalVisible}
      /* onRequestClose={() => setModalVisible(!modalVisible)} */
    >
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
                  dishId: props.dishId,
                }),
              );
              setModalVisible(!props.modalVisible);
            }}
          />
        </View>
        <View style={styles.modalButtonStyle}>
          <Button
            title="Cancel"
            color="#696969"
            onPress={() => setModalVisible(!props.modalVisible)}
          />
        </View>
      </View>
    </Modal>
  );
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
  commentStyle: {
    fontWeight: '700',
    color: 'black',
    fontSize: 15,
  },
  commentContainer: {
    padding: 15,
  },
});
export default CommentModal;
