import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  redirect,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to sign-in page if not authenticated
    return <Navigate to="/signin" />;
  }

  return children;
};

function App() {
  useEffect(() => {
    function isLoggedIn(){
      const token = localStorage.getItem("token");
      if (token) {
        const path = window.location.pathname;
        if (path === "/signup" || path === "/signin") {
          // Redirect authenticated users to dashboard
          redirect("/dashboard");
        }
      } else {
        const path = window.location.pathname;
        if (path !== "/signup" && path !== "/signin") {
          // Redirect unauthenticated users to the sign-up page
          redirect("/");
        }
      }
    }
    isLoggedIn();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/send"
          element={
            <RequireAuth>
              <SendMoney />
            </RequireAuth>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
