import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to the User Management System</h1>
      {user ? (
        <p style={{ marginTop: "20px" }}>
          Hello, <strong>{user.username}</strong>! You are logged in as <strong>{user.role === "admin" ? "Admin" : "User"}</strong>.
        </p>
      ) : (
        <p style={{ marginTop: "20px" }}>
          Please <strong>Login</strong> or <strong>Register</strong> to access your account.
        </p>
      )}
    </div>
  );
};

export default Home;
