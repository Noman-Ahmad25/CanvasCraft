import { useState } from "react";
import { register } from "../services/authApi";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage({ setIsAuth }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic client-side validation example
    if (password.length < 6) {
      return setError("Password must be at least 6 characters long");
    }

    setIsLoading(true);

    try {
      const data = await register({ name, email, password });
      
      // Assuming your API returns a token on successful registration
      localStorage.setItem("token", data.token);
      setIsAuth(true);
      navigate("/");
    } catch (err) {
      // Handles 400 Bad Request (e.g., "User already exists") or 500 Server Error
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          minLength={6} // Simple HTML5 validation
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Register"}
        </button>
      </form>

      {error && <p className="error" style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}