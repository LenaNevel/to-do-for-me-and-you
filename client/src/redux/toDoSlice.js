import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    toDoLists: {},
    allToDoLists: {},
    loading: false,
    isSuccess: false
};

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

export const getToDoLists = createAsyncThunk('/lists', async () => {
    try {
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
        saveTasks(state, { payload }) {
            const listTitle = (payload.find((x) => x && x.title) || {}).title;
            let projectID = (payload.find((x) => x && x.projectID) || {}).projectID;

            if (listTitle) {
                fetch('http://localhost:4000/api/edit-list', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ payload })
                });
            }
            if (projectID) {
                state.toDoLists[projectID] = payload;
                state.allToDoLists[projectID] = payload;
            }
        },
        deleteList(state, { payload }) {
            const projectID = payload.projectID;
            if (projectID) {
                fetch('http://localhost:4000/api/delete-list', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ payload })
                });
                delete state.toDoLists[projectID];
                delete state.allToDoLists[projectID];
            }
        },
        updateHideStatus(state, { payload }) {
            if (!(payload.complete || payload.incomplete)) {
                state.toDoLists = state.allToDoLists;
            }
            try {
                let filteredLists = {};
                for (const listId of Object.keys(state.allToDoLists)) {
                    console.log(listId);
                    let filteredList = state.allToDoLists[listId].filter((task) => {
                        if (
                            !((task.completed && payload.complete) || (!task.completed && payload.incomplete))
                        )
                            return task;
                    });

                    filteredLists[listId] = filteredList;
                }
                state.toDoLists = filteredLists;
            } catch (err) {
                console.log('THERE WAS AN ERROR FILTERING THE LISTS');
                console.log(err);
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
            state.allToDoLists = payload;
        }
    }
});

export const { saveTasks, deleteList, updateHideStatus } = toDoListsSlice.actions;
export const toDoListReducer = toDoListsSlice.reducer;
