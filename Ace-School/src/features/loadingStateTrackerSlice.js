import { createSlice } from '@reduxjs/toolkit';
// this slice stores data for upadating users
const initialState = {
    isLoading: false
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = true
        },
        clearLoading: (state, action) => {
            state.isLoading = false
        }
    }
});

export const { clearLoading, setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
