import { NavLink, useNavigate, Link } from "react-router-dom";

export default function Navbar({ darkMode, setDarkMode, isAuth, setIsAuth }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Standard cleanup procedure
    localStorage.removeItem("token");
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <nav className={`navbar ${darkMode ? "dark" : "light"}`}>
      <div className="nav-brand">
        <Link to="/"><h1>🎨CanvasCraft</h1></Link>
      </div>

      <div className="nav-menu">
            <NavLink to="/" end className={({ isActive }) => isActive ? "active-link" : ""}>
              Editor
            </NavLink>
          {isAuth && (
            <NavLink to="/gallery" className={({ isActive }) => isActive ? "active-link" : ""}>
              Gallery
            </NavLink>
        )}
      </div>

      <div className="nav-actions">
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="theme-toggle"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {isAuth ? (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        ) : (
          <Link to="/login" className="login-link">Login</Link>
        )}
      </div>
    </nav>
  );
}