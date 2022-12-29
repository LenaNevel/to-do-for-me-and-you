import { configureStore } from '@reduxjs/toolkit';

import { toDoListReducer } from './toDoSlice';

export default configureStore({
    reducer: {
        toDoLists: toDoListReducer
    }
});
