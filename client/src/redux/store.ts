import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const userReducer = require("./reducers/userReducer.ts");
//const dataReducer = require("./reducers/dataReducer.ts");
//const uiReducer = require("./reducers/uiReducer.ts");

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  //data: dataReducer,
  //ui: uiReducer
});

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleware))
);

export default store;
