import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    toDoLists: {},
    loading: false,
    isSuccess: false
};

export const getToDoLists = createAsyncThunk('/lists', async () => {
    try {
        // need to move the api call to it's own function;
        const lists = await fetch('http://localhost:4000/api/lists').then((data) => data.json());
        return lists;
    } catch (err) {
        console.log('THERE WAS AN ERROR GETTING THE LISTS');
        console.log(err);
    }
});

const toDoListsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        //in here will go the functions to filter the to do lists to display the proper one for editing
        toggleTask(state, { payload }) {
            const { id, projectID } = payload;
            const existingTask = state.toDoLists[projectID].find((task) => task.id.toString() === id);
            if (existingTask) {
                existingTask.completed = !existingTask.completed;
                const headers = {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                };
                fetch('http://localhost:4000/api/update-task', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        condition: { id: id, projectID: projectID },
                        update: { completed: existingTask.completed }
                    })
                });
            }
        }
    },
    extraReducers: {
        [getToDoLists.pending]: (state) => {
            state.loading = true;
        },
        [getToDoLists.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = true;
            state.toDoLists = payload;
        }
    }
});

export const { toggleTask } = toDoListsSlice.actions;
export const toDoListReducer = toDoListsSlice.reducer;
