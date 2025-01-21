const store = require("./app/store");
const fetchUsers = require("./features/user/userSlice").fetchUsers;

console.log("initial state: ", store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("updated state: ", store.getState());
});

store.dispatch(fetchUsers());

// unsubscribe();
