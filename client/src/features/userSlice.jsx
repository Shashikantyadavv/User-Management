import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null, 
  users: [], 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload; 
      localStorage.setItem('token', action.payload); 
    },
    logout(state) {
      state.token = null; 
      localStorage.removeItem('token'); 
    },
    setUsers(state, action) {
      state.users = action.payload; 
    },
  },
});

export const { setToken, logout, setUsers } = userSlice.actions;
export default userSlice.reducer;
