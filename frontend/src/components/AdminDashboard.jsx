import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:10000/api/auth/get-user", { withCredentials: true });
        setUsers(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:10000/api/auth/delete-user/${id}`, { withCredentials: true });
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <span>{user.username} ({user.email})</span>
            <button onClick={() => deleteUser(user._id)} style={{ cursor: "pointer" }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
