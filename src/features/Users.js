import { createSlice } from "@reduxjs/toolkit";

const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("usersState", serializedState);
    } catch (error) {
        console.error("Error while saving state in localStorage:", error);
    }
};

const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem("usersState");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.error("Error while loading state from localStorage:", error);
        return undefined;
    }
};

const initialState = loadStateFromLocalStorage() || null ;

export const usersSlice = createSlice({
    name: "users",
    initialState: { value: initialState },
    reducers: {
        addUser: (state, action) => {
            state.value.push(action.payload);
            saveStateToLocalStorage(state.value);
        },
        deleteUser: (state, action) => {
            state.value = state.value.filter((user) => user.id !== action.payload.id);
            saveStateToLocalStorage(state.value);
        },
        updateUsername: (state, action) => {
            state.value = state.value.map((user) => {
                if (user.id === action.payload.id) {
                    return { ...user, username: action.payload.username };
                }
                return user;
            });
            saveStateToLocalStorage(state.value);
        },
    }
});

export const { addUser, deleteUser, updateUsername } = usersSlice.actions;

export default usersSlice.reducer;