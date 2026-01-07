import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import Navbar from "./navigation/Navbar"; 
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./component/styles.css";

export default function App() {
  const [imageToLoad, setImageToLoad] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <Router>
        {/* Global Navbar handles Theme and Auth state */}
        <Navbar 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          isAuth={isAuth} 
          setIsAuth={setIsAuth} 
        />

        <Routes>
          <Route
            path="/"
            element={isAuth ? (
              <HomePage imageToLoad={imageToLoad} darkMode={darkMode} />
            ) : (
              <Navigate to="/login" />
            )}
          />

          <Route path="/login" element={<LoginPage setIsAuth={setIsAuth} />} />
          <Route path="/register" element={<RegisterPage setIsAuth={setIsAuth} />} />

          <Route
            path="/gallery"
            element={isAuth ? (
              <GalleryPage onLoadImage={setImageToLoad} darkMode={darkMode} />
            ) : (
              <Navigate to="/login" />
            )}
          />
        </Routes>
      </Router>
    </div>
  );
}