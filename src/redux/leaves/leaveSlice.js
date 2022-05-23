import { createSlice } from "@reduxjs/toolkit";
import LEAVES from "../../LEAVES.json";

export const leaveSlice = createSlice({
    name: 'leaves',
    initialState: {
        LEAVES,
    },
    reducers: {
        add: (state, action) => {
            state.LEAVES.push(action.payload);
        },
        remove: (state, action) => {
            state.LEAVES = state.LEAVES.filter(leave => leave.id !== action.payload);
        },
        get: (state) => {
            state.LEAVES = LEAVES;
        }
    }
});

export const { add, remove } = leaveSlice.actions;

export default leaveSlice.reducer;