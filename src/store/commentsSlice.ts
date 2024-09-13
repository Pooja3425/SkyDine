import {createSlice, } from '@reduxjs/toolkit';
import { CommentsInitialState} from './comments_model';

const CommentsSlice = createSlice({
  name: 'comments',
  initialState: {
    commentsList: CommentsInitialState,
  },
  reducers: {
    addComment: (state, action) => {
      const data = action.payload;
      state.commentsList.comments.push(data);
      console.log(...state.commentsList.comments);
    },
  },
});

export const {addComment} = CommentsSlice.actions;
export default CommentsSlice.reducer;
