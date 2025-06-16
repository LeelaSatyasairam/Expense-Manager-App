import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
  // Check if user is logged in, e.g. by checking a token in localStorage
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("name");
  const personid = localStorage.getItem("personid");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [isVerified, setIsVerified] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/detail?username=${username}&personid=${personid}`)
        const servertoken = res.data.data.token
        if (servertoken == token) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      } catch (err) {
        console.log("Token verification failed:", err);
        setIsVerified(false);
      }
    }
    if (token && personid && username) {
      fetchData();
    } else {
      setIsVerified(false);
    }
  }, [token, username, personid]);
  // Show loading screen while checking
  if (isVerified === null) {
    return <div>Loading...</div>;
  }
  // If verified, show the children
  if (isVerified) {
    return children;
  }
  // If verification failed, redirect to login
  return <Navigate to="/" replace />;
}
