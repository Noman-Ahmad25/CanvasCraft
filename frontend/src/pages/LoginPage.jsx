import { useState } from "react";
import { login } from "../services/authApi";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); // Start loading

    try {
      const data = await login({ email, password });

      // If we made it here, the request was successful (200 OK)
      localStorage.setItem("token", data.token);
      setIsAuth(true);
      navigate("/");
    } catch (err) {
      // Catch errors thrown by our service (401, 500, etc.)
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false); // Stop loading regardless of outcome
    }
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading} // Prevent input while loading
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p className="error" style={{ color: 'red' }}>{error}</p>}

      <p>
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}