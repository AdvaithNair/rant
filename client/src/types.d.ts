export type RantData = {
  rantID: string;
  userName: string;
  handle: string;
  title: string;
  body: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  imageURL: string;
};

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
