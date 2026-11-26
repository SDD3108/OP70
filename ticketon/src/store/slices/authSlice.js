import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "@/src/services/authService";

export const loginUser = createAsyncThunk("auth/login", (credentials) => authService.login(credentials));
export const registerUser = createAsyncThunk("auth/register", (values) => authService.register(values));
export const loadCurrentUser = createAsyncThunk("auth/me", () => authService.getMe());
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, status: "idle", error: null },
  reducers: {
    clearAuthError(state) { state.error = null; },
    clearAuth(state) { state.user = null; state.status = "idle"; state.error = null; },
  },
  extraReducers(builder) {
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.status = "idle"
        state.error = null
      })
      .addMatcher(
        (action) => [loginUser.pending.type, registerUser.pending.type, loadCurrentUser.pending.type, logoutUser.pending.type].includes(action.type),(state) => {
          state.status = "loading";
          state.error = null;
        },
      )
      .addMatcher(
        (action) => [loginUser.fulfilled.type, registerUser.fulfilled.type, loadCurrentUser.fulfilled.type].includes(action.type),
        (state, action) => {
          state.user = action.payload
          state.status = "succeeded"
        },
      )
      .addMatcher(
        (action) => [loginUser.rejected.type, registerUser.rejected.type, loadCurrentUser.rejected.type, logoutUser.rejected.type].includes(action.type),
        (state, action) => {
          state.status = "failed"
          state.error = action.error?.message || "Ошибка запроса"
        },
      );
  },
});

export const { clearAuthError, clearAuth } = authSlice.actions;
export default authSlice.reducer;
