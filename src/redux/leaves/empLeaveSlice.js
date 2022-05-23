import { createSlice } from "@reduxjs/toolkit";
import EMP_LEAVES from "../../EMP_LEAVES.json";

export const empleaveSlice = createSlice({
    name: 'emp_leaves',
    initialState: {
        EMP_LEAVES,
    },
    reducers: {}
});

export const { } = empleaveSlice.actions;

export default empleaveSlice.reducer;