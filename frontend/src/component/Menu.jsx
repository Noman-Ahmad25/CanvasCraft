export default function Menu({
  setTool,
  setColor,
  setSize,
  undo,
  redo,
  clearCanvas,
  save,
  saveCanvasToBackend,
  isSaving,
  darkMode,
  selectedFormat,
  setSelectedFormat,
}) {
  return (
    <div className={`menu`}>
      <div className="menu-controls">
        <button onClick={() => setTool("brush")} aria-label="Brush">🖌️</button>
        <button onClick={() => setTool("eraser")} aria-label="Eraser">🧽</button>
        <button onClick={() => setTool("line")} aria-label="Line">↔️</button>
        <button onClick={() => setTool("rect")} aria-label="Rectangle">▭</button>
        <button onClick={() => setTool("circle")} aria-label="Circle">⚪</button>
        <button onClick={undo} aria-label="Undo">↩️</button>
        <button onClick={redo} aria-label="Redo">↪️</button>
        <button onClick={clearCanvas} aria-label="Clear">🗑️</button>

        <span className="download-container">
          <select value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)}>
            <option value="png">PNG</option>
            <option value="jpeg">JPG</option>
            <option value="webp">WebP</option>
          </select>
          <button onClick={() => save(selectedFormat)}>📥 Download</button>
        </span>

        <button onClick={saveCanvasToBackend} disabled={isSaving}>
          {isSaving ? "Saving..." : "☁️ Save"}
        </button>

        <input type="color" onChange={(e) => setColor(e.target.value)} aria-label="Pick Color" />
        <input type="range" min="1" max="50" onChange={(e) => setSize(e.target.value)} aria-label="Brush Size" />
      </div>
    </div>
  );
}