"use client";

import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, loadCurrentUser, logoutUser } from "@/src/store/slices/authSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);

  return {
    user,
    isAuthenticated: Boolean(user),
    isLoading: status === "loading",
    error,
    login: (values) => dispatch(loginUser(values)).unwrap(),
    register: (values) => dispatch(registerUser(values)).unwrap(),
    refresh: () => dispatch(loadCurrentUser()).unwrap(),
    logout: () => dispatch(logoutUser()).unwrap(),
  };
}
