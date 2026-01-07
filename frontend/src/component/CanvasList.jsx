export default function CanvasList({ canvases, onLoad, onDelete }) {
  if (!canvases || !canvases.length) {
    return (
      <div className="empty-gallery">
        <p>No saved canvases yet. Your masterpieces will appear here!</p>
      </div>
    );
  }

  return (
    <div className="canvas-grid">
      {canvases.map((canvas) => (
        <div key={canvas._id} className="canvas-card">
          <div className="canvas-preview">
            <img src={canvas.image} alt={canvas.title} loading="lazy" />
          </div>
          
          <div className="card-info">
            <h3>{canvas.title || "Untitled Drawing"}</h3>
              <button className="btn-load" onClick={() => onLoad(canvas.image)}>
                Open in Editor
              </button>
            {canvas.updatedAt && (
              <span className="card-date">
                {new Date(canvas.updatedAt).toLocaleDateString()}
              </span>
            )}
            <button 
              className="btn-delete" 
              onClick={() => onDelete(canvas._id)}
              aria-label="Delete drawing"
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}