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
  rantverseScore?: number;
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

export type NetworkData = {
  handle: string;
  imageURL: string;
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

export type UserCredentials = {
  bio?: string;
  imageURL: string;
  firstName?: string;
  lastName?: string;
  userName: string;
  handle: string;
  email: string;
  userID: string;
  createdAt: string;
  website?: string;
  friendCount?: number;
  followerCount?: number;
  followingCount?: number;
  friends?: Array<NetworkData>;
  followers?: Array<NetworkData>;
  following?: Array<NetworkData>;
}

export type UI = {
  loading: boolean;
  errors: {[k: string]: string}
}

export type GlobalState = {
  authenticated: boolean;
  credentials: UserCredentials;
  likes: Array<LikeData>;
  notifications: Array<NotificationData>;
  UI: UI;
  rants: Array<RantData>
}

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
  state: GlobalState;
  dispatch: ({}) => void;
};
