import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    students: []
};

const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        addStudents(state, action) {
            state.students = [...state.students, action.payload]
            // expecting ? idk aaja aba aru ko ni fetch banayera sutni
            //yeslai paxi use garumla no need for now react quwry use garni for cahching as slice ko need xaina ek thau ma matrai use vairaxxa data
        },
    }
});

export const { setMessages } = studentsSlice.actions;
export default studentsSlice.reducer;
