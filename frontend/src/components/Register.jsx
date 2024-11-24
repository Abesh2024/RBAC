import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:10000/api/auth/register", formData);
      alert("Registration successful");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <input type="text" placeholder="Username" onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
      <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
      <button type="submit" style={{ cursor: "pointer" }}>Register</button>
    </form>
  );
};

export default Register;
