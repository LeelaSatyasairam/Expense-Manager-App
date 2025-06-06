import React from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
  // Check if user is logged in, e.g. by checking a token in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    // If not logged in, redirect to login page ("/")
    return <Navigate to="/" replace />;
  }

  // If logged in, render the children components (protected page)
  return children;
}
