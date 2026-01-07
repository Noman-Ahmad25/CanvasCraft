import { useEffect, useState } from "react";
import { getCanvases, deleteCanvas } from "../services/canvasApi";
import CanvasList from "../component/CanvasList";
import { useNavigate, Link } from "react-router-dom";

export default function GalleryPage({ onLoadImage, darkMode }) {
  const [canvases, setCanvases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCanvases = async () => {
      try {
        setIsLoading(true);
        const res = await getCanvases();
        // Adjust this based on your API response structure
        const data = res.data || res; 
        setCanvases(data);
      } catch (err) {
        setError("Failed to load gallery.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCanvases();
  }, []);

  const handleLoad = (image) => {
    onLoadImage(image);
    navigate("/");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this drawing?")) {
      try {
        await deleteCanvas(id);
        setCanvases((prev) => prev.filter((canvas) => canvas._id !== id));
      } catch (err) {
        alert("Error deleting canvas");
      }
    }
  };

  return (
    <div className={`gallery-page ${darkMode ? "dark" : "light"}`}>
      <div className="gallery-header">
        <h2>🖼 Your Gallery</h2>
        <Link to="/" className="btn-primary">Create New Drawing</Link>
      </div>

      {isLoading ? (
        <div className="loader">Loading your masterpieces...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : canvases.length === 0 ? (
        <div className="empty-state">
          <p>No drawings found yet.</p>
          <Link to="/">Start drawing now!</Link>
        </div>
      ) : (
        <CanvasList
          canvases={canvases}
          onLoad={handleLoad}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}