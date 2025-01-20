/*
Middleware(Async) continue... | continues to index6.js

Async action creators
need to install 2 packages

axios:
    - to make request to an api end point
redux-thunk:
    - used to define async action creators
    - it is middlware 


*/
const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const axios = require("axios");
const thunk = require("redux-thunk").thunk;

const URL = "https://jsonplaceholder.typicode.com/users"; // valid url
// const URL = "https://jsonplaceholder.typicode.com/usersdfrc"; // invalid url

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  };
};

const fetchUsersSucceded = (users) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  };
};

const fetchUsersFailed = (errMessage) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: errMessage,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

function fetchUsers(URL) {
  return async function (dispatch) {
    dispatch(fetchUsersRequest());
    try {
      const response = await axios.get(URL);
      const data = response.data;
      const users = data.map((user) => user.name);
      dispatch(fetchUsersSucceded(users));
    } catch (error) {
      dispatch(fetchUsersFailed(error.message));
    }
  };
}

const store = createStore(reducer, applyMiddleware(thunk));
console.log("IntitialState: ", store.getState());
store.subscribe(() => {
  console.log("updated state: ", store.getState());
});

store.dispatch(fetchUsers(URL));
