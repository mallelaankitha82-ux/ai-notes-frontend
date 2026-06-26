import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://127.0.0.1:8000/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert("Registration Successful");

      setName("");
      setEmail("");
      setPassword("");

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.detail ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="container">

      <div
        className="card shadow-lg mx-auto p-4"
        style={{ maxWidth: "500px" }}
      >
        <div className="text-center mb-4">
          <h2>Register</h2>
          <p className="text-muted">
            Create your AI Notes account
          </p>
        </div>

        <form onSubmit={handleRegister}>

          <div className="mb-3">
            <label className="form-label">
              Full Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
          >
            Register
          </button>

        </form>
      </div>

    </div>
  );
}