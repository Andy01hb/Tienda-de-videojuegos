import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/register.css";

export const Register = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the register action (which uses the /api/auth/register endpoint)
      const regData = await actions.registerUser(email, password);
      if (regData) {
        // Registration successful, now automatically log the user in
        const loginData = await actions.loginUser(email, password);
        if (loginData) {
          navigate("/profile");
        } else {
          setError("Registration succeeded but auto-login failed.");
        }
      }
    } catch (err) {
      setError("Error connecting to the server");
    }
  };
  
  return (
    <div className="register-page">
      <div className="container">
        <h1>Register</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};
