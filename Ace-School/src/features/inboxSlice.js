import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    noOfInboxes: 0,
    inbox: [],
};

const inboxSlice = createSlice({
    name: 'inbox',
    initialState,
    reducers: {
        setMessages(state, action) {
            state.noOfInboxes = 0
            state.inbox = action?.payload || [];
            action?.payload?.forEach(element => {
                if (element?.seen === false) {
                    state.noOfInboxes++
                }
            });

        },

    },
});

export const { setMessages } = inboxSlice.actions;
export default inboxSlice.reducer;
