/*
1. action | action creator
2. reducer
3. store
4. subscribe to store
5. unsubscribe to store 
*/
const redux = require("redux");
const createStore = redux.createStore;

const CAKE_ORDERED = "CAKE_ORDERED";

// ACTION creator, it return the action object.
function cakeOrdered() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

// REDUCER, it accept two arguments, state and action, based on action reducer will return new application state.
const initialState = {
  noOfCakes: 10,
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        noOfCakes: state.noOfCakes - 1,
      };
    default:
      return state;
  }
}

// STORE

// create store
const store = createStore(reducer);

// access state from store
console.log("Initial state: ", store.getState());

// subscribe to store, to dispatch any action
const unsubscribe = store.subscribe(() => {
  console.log("Updated state: ", store.getState());
});

// dispatch an actions, using action creators, which returns the action object
store.dispatch(cakeOrdered());
store.dispatch(cakeOrdered());

// unsubscribe to store, after this we can not dispatch an actions
unsubscribe();

// This dispatch won't work
store.dispatch(cakeOrdered());
