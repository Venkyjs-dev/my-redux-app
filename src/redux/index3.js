/*
1. adding another new state to store
2. write new state logic also in single reducer
*/
const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCK = "CAKE_RESTOCK";

const ICECREAM_ORDERED = "ICECREM_ORDERED";
const ICECREAM_RESTOCK = "ICECREM_RESTOCK";

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

function icecreamOrdered(qnt = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qnt,
  };
}

function icecreamRestock(qnt = 1) {
  return {
    type: ICECREAM_RESTOCK,
    payload: qnt,
  };
}

// REDUCER, it accept two arguments, state and action, based on action reducer will return new application state.
const initialState = {
  noOfCakes: 10,
  noOfIcecreams: 20,
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
    case ICECREAM_ORDERED:
      return {
        ...state,
        noOfIcecreams: state.noOfIcecreams - action.payload,
      };
    case ICECREAM_RESTOCK:
      return {
        ...state,
        noOfIcecreams: state.noOfIcecreams + action.payload,
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
const action = bindActionCreators(
  { cakeOrdered, cakeResock, icecreamOrdered, icecreamRestock },
  store.dispatch
);
action.cakeOrdered();
action.cakeOrdered();
action.cakeOrdered();
action.cakeResock(3);
action.icecreamOrdered();
action.icecreamOrdered();
action.icecreamRestock(2);

// unsubscribe to store, after this we can not dispatch an actions
unsubscribe();

// This dispatch won't work
store.dispatch(cakeOrdered());
