import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:10000/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav style={{ padding: "10px", backgroundColor: "#f4f4f4", display: "flex", justifyContent: "space-between" }}>
      <div>
        <Link to="/">Home</Link>
        {user?.role === "admin" && <Link to="/admin-dashboard" style={{ marginLeft: "15px" }}>Admin Dashboard</Link>}
      </div>
      <div>
        {user ? (
          <button onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" style={{ marginLeft: "15px" }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
