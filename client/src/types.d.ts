export type RantData = {
  rantID: string;
  userName: string;
  handle: string;
  title: string;
  body: string;
  likeCount: Number;
  commentCount: Number;
  createdAt: string;
  imageURL: string;
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
  state: any;
  dispatch: ({}) => void;
};
