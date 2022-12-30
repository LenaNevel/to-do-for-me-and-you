import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    toDoLists: {},
    loading: false,
    isSuccess: false
};

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
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
        toggleTask(state, { payload }) {
            const { id, projectID } = payload;
            const existingTask = state.toDoLists[projectID].find((task) => task.id.toString() === id);
            if (existingTask) {
                existingTask.completed = !existingTask.completed;
                fetch('http://localhost:4000/api/update-task', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        condition: { id: id, projectID: projectID },
                        update: { completed: existingTask.completed }
                    })
                });
            }
        },
        saveNewTask(state, { payload }) {
            // move list title and project ID to utils since we re-use this;
            console.log(payload);
            const listTitle = (payload.find((x) => x && x.title) || {}).title;
            let projectID = (payload.find((x) => x && x.projectID) || {}).projectID;
            if (listTitle) {
                fetch('http://localhost:4000/api/create-list', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ payload })
                });
            }
            if (projectID) {
                state.toDoLists[projectID] = payload;
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

export const { toggleTask, saveNewTask } = toDoListsSlice.actions;
export const toDoListReducer = toDoListsSlice.reducer;
