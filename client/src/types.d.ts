import { StringifyOptions } from "querystring";

export type RantData = {
  rantID: string;
  userName: string;
  userID: string;
  handle: string;
  title: string;
  body: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  imageURL: string;
};

export type CommentData = {
  rantID: string;
  userName: string;
  userID: string;
  handle: string;
  body: string;
  createdAt: string;
  imageURL: string;
  commentID: string;
};

export type LikeData = {
  rantID: string;
  userID: string;
  handle: string;
  imageURL: string;
  recipient: string;
};

export type NotificationData = {
  rantID: string;
  sender: string;
  recipient: string;
  createdAt: string;
  type: string;
  read: boolean;
  notificationID: string; 
  imageURL: string;
  body?: string;
}

export type SearchUserData = {
  handle: string;
  userName: string;
  imageURL: string;
}

export type ManipulateRantData = {
  pageTitle: string;
  title: string;
  body: string;
};

export type SignUp = {
  firstName: string;
  lastName: string;
  handle: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LogIn = {
  email: string;
  password: string;
};

// Context Value Interface
export type ReducerContext = {
  state: {[k: string]: any};
  dispatch: ({}) => void;
};
