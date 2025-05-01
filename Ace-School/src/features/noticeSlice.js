import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    noOfNotices: 0,
    notices: [],
    isEditing: false,
    editingNotice: {},
};

const noticeSlice = createSlice({
    name: 'notice',
    initialState,
    reducers: {
        setNotices(state, action) {
            state.noOfNotices = action.payload.length
            state.notices = action.payload;


        },
        setEditingNotice(state, action) {
            state.isEditing = true
            state.editingNotice = action.payload
        },
        clearEditingNotice(state, action) {
            state.isEditing = false,
                state.editingNotice = {}
        }

    },
});

export const { setNotices, setEditingNotice, clearEditingNotice } = noticeSlice.actions;
export default noticeSlice.reducer;
