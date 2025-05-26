import { createSlice } from '@reduxjs/toolkit';
// this slice stores data for upadating users
const initialState = {
    students: []
};

const usersSlice = createSlice({
    name: 'userss',
    initialState,
    reducers: {
        addUsers(state, action) {
            state.userData = action.payload

        },
    }
});

export const { setMessages } = usersSlice.actions;
export default usersSlice.reducer;
