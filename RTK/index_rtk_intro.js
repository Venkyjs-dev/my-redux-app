/*
Cons of redux libarary:

Redux require too much boilerplate code
    - for every state transicition, we need
        1. Action
        2. Action object
        3. Action creator
        4. Switch statement in a reducer
A lot of other packages have to be installed to work with redux
    1. Redux thunk 
    2. Immer
    3. Redux-devtools

Reasons to Move from Redux to Redux Toolkit (RTK)

1. Less Boilerplate Code
Redux: Requires writing a lot of repetitive code for actions, reducers, and types.
RTK: Simplifies this with utilities like createSlice, which automatically generates actions and reducers.

2. Better Developer Experience
Redux: Doesn't include tools or guidelines for common tasks like middleware setup.
RTK: Comes pre-configured with useful middleware (like redux-thunk) and integrates the Redux DevTools for debugging.

3. Simplified Store Configuration
Redux: Store setup requires combining reducers, adding middleware, and configuring enhancers manually.
RTK: configureStore streamlines store setup with sensible defaults.

4. Improved State Immutability
Redux: Developers must manually ensure state updates are immutable.
RTK: Uses Immer to handle immutability automatically, reducing the risk of bugs.

5. Advanced Features with Minimal Effort
Redux: Complex tasks like managing async actions or creating slices require custom code.
RTK: Provides utilities like createAsyncThunk for async logic and createEntityAdapter for managing normalized state.

6. Smaller Learning Curve for New Developers
Redux: The setup can be intimidating for beginners due to its complexity.
RTK: Makes Redux easier to learn and adopt by abstracting away the difficult parts.

Switching to Redux Toolkit allows you to write cleaner, more maintainable, and modern Redux code while reducing the chances of errors.
*/

/*
1. Extra reducers: not understand this concept, refer this concept again.
2. Asyn thunk in redux tookit --> pending

*/
