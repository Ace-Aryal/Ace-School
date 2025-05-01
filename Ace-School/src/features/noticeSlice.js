import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    noOfNotices: 0,
    notices: [],
};

const noticeSlice = createSlice({
    name: 'notice',
    initialState,
    reducers: {
        setNotices(state, action) {
            state.noOfNotices = action.payload.length
            state.notices = action.payload;


        },

    },
});

export const { setNotices } = noticeSlice.actions;
export default noticeSlice.reducer;
