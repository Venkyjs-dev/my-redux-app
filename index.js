console.log("from index.js -->");
const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCK = "CAKE_RESTOCK";

// ACTION creator, it return the action object.
function cakeOrdered() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function cakeResock(qunatity) {
  return {
    type: CAKE_RESTOCK,
    payload: qunatity,
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
    case CAKE_RESTOCK:
      return {
        ...state,
        noOfCakes: state.noOfCakes + action.payload,
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
// store.dispatch(cakeOrdered());
// store.dispatch(cakeOrdered());
// store.dispatch(cakeOrdered());
// store.dispatch(cakeResock(10));

// alternative to store.dispatch()
const action = bindActionCreators({ cakeOrdered, cakeResock }, store.dispatch);
action.cakeOrdered();
action.cakeOrdered();
action.cakeOrdered();
action.cakeResock(10);

// unsubscribe to store, after this we can not dispatch an actions
unsubscribe();

// This dispatch won't work
store.dispatch(cakeOrdered());
