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
            state.noOfNotices = 0
            state.notices = action.payload;
            action?.payload.forEach(element => {
                if (element?.seen === false) {
                    state.noOfNotices++
                }
            });

        },

    },
});

export const { setNotices } = noticeSlice.actions;
export default noticeSlice.reducer;
