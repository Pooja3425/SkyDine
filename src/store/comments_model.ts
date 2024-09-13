export const CommentsInitialState: Comments = {
  comments: [{id: '', name: '', rating: 0, comment: '', dishId: ''}],
};

export interface Comments {
  comments: CommentsList[];
}

export interface CommentsList {
  id: string;
  name: string;
  rating: number;
  comment: string;
  dishId: string;
}
