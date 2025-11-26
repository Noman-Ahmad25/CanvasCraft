export default function Menu({ setTool, setColor, setSize, undo, redo, clearCanvas, save, darkMode, setDarkMode }) {
  return (
    <div className={`menu ${darkMode ? "dark" : "light"}`}>
      <button onClick={() => setTool("brush")}>🖌️</button>
      <button onClick={() => setTool("eraser")}>🧽</button>
      <button onClick={() => setTool("line")}>↔️</button>
      <button onClick={() => setTool("rect")}>▭</button>
      <button onClick={() => setTool("circle")}>⚪</button>

      <button onClick={undo}>↩️</button>
      <button onClick={redo}>↪️</button>
      <button onClick={clearCanvas}>🗑️</button>
      <button onClick={save}>💾</button>

      <input type="color" onChange={(e) => setColor(e.target.value)} />
      <input type="range" min="1" max="50" onChange={(e) => setSize(e.target.value)} />

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
}
