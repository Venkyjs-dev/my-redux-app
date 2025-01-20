/*
1. state returned by the reducer should be new state everytime.
2. so, we have to copy the old state as it is and update the required value and return it.
3. eventhough, state is an object but it was not mutable.
4. by using immer package, we can mutate the state.
*/

const redux = require("redux");
const createStore = redux.createStore;
const produce = require("immer").produce;

const UPDATE_STREET = "UPDATE_STREET";
const UPDATE_SKILL = "UPDATE_SKILL";

function updateStreet(street) {
  return {
    type: UPDATE_STREET,
    payload: street,
  };
}

function updateSkill(skillObj) {
  return {
    type: UPDATE_SKILL,
    payload: skillObj,
  };
}

const initialState = {
  name: "Venky",
  address: {
    street: "sector 5",
    village: "Ghansoli",
    city: "Navi Mumbai",
    skills: ["javascript", "react", "redux", "node"],
  },
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_STREET:
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: action.payload,
      //     },
      //   };
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    case UPDATE_SKILL:
      const { pos, skill } = action.payload;
      //   const newSkills = [...state.address.skills];
      //   newSkills[pos] = skill;
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       skills: newSkills,
      //     },
      //   };
      return produce(state, (draft) => {
        draft.address.skills[pos] = skill;
      });
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log("Initial state: ", store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("Updated state: ", store.getState());
});

store.dispatch(updateStreet("sector 6"));
store.dispatch(updateSkill({ pos: 1, skill: "Next" }));

unsubscribe();
