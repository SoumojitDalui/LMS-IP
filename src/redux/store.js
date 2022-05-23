import { configureStore } from '@reduxjs/toolkit';
import leaveReducer from './leaves/leaveSlice';
import empLeaveReducer from './leaves/empLeaveSlice';

export default configureStore({
    reducer: {
        leaves: leaveReducer,
        emp_leaves: empLeaveReducer
    }
});
