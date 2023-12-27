import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todaysTasks: [],
    tomorrowTasks: [],
    thenTasks: [],
    completed: 0,
    unCompleted: 0,
};

const todosReducer = createSlice({
    name: "todos",
    initialState,
    reducers: {
        // add tasks
        addTaskToday: (state, action) => {
            state.todaysTasks.push(action.payload);
            state.unCompleted += 1;

            state.todaysTasks.sort(
                (a, b) => a.time.slice(0, 2) - b.time.slice(0, 2)
            );
        },
        addTaskTomorrow: (state, action) => {
            state.tomorrowTasks.push(action.payload);
            state.unCompleted += 1;

            state.tomorrowTasks.sort(
                (a, b) => a.time.slice(0, 2) - b.time.slice(0, 2)
            );
        },
        addTaskThen: (state, action) => {
            state.thenTasks.push(action.payload);
            state.unCompleted += 1;

            state.thenTasks.sort((a, b) => a.date.slice(-4) - b.date.slice(-4));
        },

        // update checkbox value
        updateTaskToday: (state, action) => {
            state.todaysTasks.forEach((item) => {
                if (item.id === action.payload) {
                    item.completed = !item.completed;

                    if (item.completed) {
                        state.unCompleted -= 1;
                        state.completed += 1;
                    } else {
                        state.unCompleted += 1;
                        state.completed -= 1;
                    }
                }
            });
        },
        updateTaskTomorrow: (state, action) => {
            state.tomorrowTasks.forEach((item) => {
                if (item.id === action.payload) {
                    item.completed = !item.completed;

                    if (item.completed) {
                        state.unCompleted -= 1;
                        state.completed += 1;
                    } else {
                        state.unCompleted += 1;
                        state.completed -= 1;
                    }
                }
            });
        },
        updateTaskThen: (state, action) => {
            state.thenTasks.forEach((item) => {
                if (item.id === action.payload) {
                    item.completed = !item.completed;

                    if (item.completed) {
                        state.unCompleted -= 1;
                        state.completed += 1;
                    } else {
                        state.unCompleted += 1;
                        state.completed -= 1;
                    }
                }
            });
        },
    },
});

export const {
    addTaskToday,
    addTaskThen,
    addTaskTomorrow,
    updateTaskToday,
    updateTaskThen,
    updateTaskTomorrow,
} = todosReducer.actions;

export default todosReducer.reducer;
