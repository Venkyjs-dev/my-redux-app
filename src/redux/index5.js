/*
  Middleware(sync)
1. Is the suggested way to extend Redux with custom functionality
2. provides a  third party extesion point between dispatching an action, 
3. and the momement it reaches the the reducer
4. Use middleware for logging, crash reporting, performaming asynchrous tasks etc.

package name : redux-logger 

step1: install redux-logger
step2: import applyMiddleware function from redux
step3: import logger function from redux-logger
step4: pass applyaMiddlware as a second argument to the createStore.
step5: pass logger as argument to applyMiddware function
*/
const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyaMiddlware = redux.applyMiddleware;
const { logger } = require("redux-logger");

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
const cakeInitialState = {
  noOfCakes: 10,
};
const icecreamInitialState = {
  noOfIcecreams: 20,
};
function cakeReducer(state = cakeInitialState, action) {
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
function icecreamReducer(state = icecreamInitialState, action) {
  switch (action.type) {
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

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: icecreamReducer,
});

// STORE

// create store
const store = createStore(rootReducer, applyaMiddlware(logger));

// access state from store
console.log("Initial state: ", store.getState());

// subscribe to store, to dispatch any action
const unsubscribe = store.subscribe(() => {
  // console.log("Updated state: ", store.getState());
});

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
