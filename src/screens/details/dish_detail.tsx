/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Rating} from 'react-native-ratings';
import {CommentsList} from '../../store/comments_model';

type CommentProp = {
  comments: CommentsList[];
  dishId: string;
};
export const DishDetail = (props: CommentProp) => {
  console.log(...props.dishId);
  type ItemProps = {author: string; comment: string; rating: number};

  const CommentRow = ({author, comment, rating}: ItemProps) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentStyle}>{comment}</Text>
      <View pointerEvents="none">
        <Rating
          readonly={true}
          startingValue={rating}
          imageSize={15}
          style={{alignItems: 'flex-start', marginTop: 8, marginBottom: 8}}
        />
      </View>
      <Text style={{color: 'black', fontSize: 15}}>- {author}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.commentStyle}>Comments</Text>
      <FlatList
        data={props.comments.filter(item => item.dishId === props.dishId)}
        renderItem={({item}) => {
          return (
            <CommentRow
              author={item.name}
              comment={item.comment}
              rating={item.rating}
            />
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding:15,
  },
  comment:{
    fontWeight: '700',
    color: 'black',
    fontSize: 20,
  },
  commentStyle: {
    fontWeight: '700',
    color: 'black',
    fontSize: 20,
    alignItems: 'center',
    textAlign:'center',
    alignContent:'center',
  },
  commentContainer: {
    padding: 15,
  },
  textStyle: {
    fontWeight: '700',
    color: 'black',
    fontSize: 15,
  },
});
