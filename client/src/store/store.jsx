import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice'; 
const store = configureStore({
  reducer: {
    user: userReducer, // Ensure user slice is included here
  },
});

export default store;
