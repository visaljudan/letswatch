import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  currentUser: any;
  error: any;
  loading: boolean;
}

const initialState: UserState = {
  currentUser: null,
  error: null,
  loading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUpStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signUpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    signOutStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateRoleStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateRoleSuccess: (state, action) => {
      if (state.currentUser && state.currentUser.id === action.payload.userId) {
        state.currentUser.role = action.payload.newRole;
      }
      state.loading = false;
      state.error = null;
    },
    updateRoleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signUpStart,
  signUpFailure,
  signUpSuccess,
  signInStart,
  signInSuccess,
  signInFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
  updateRoleStart,
  updateRoleSuccess,
  updateRoleFailure,
} = userSlice.actions;
export default userSlice.reducer;
