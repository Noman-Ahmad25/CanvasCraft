import { useState, useRef, useEffect } from "react";
import Menu from "./Menu";
import Canvas from "./Canvas";
import "./styles.css";

export default function App() {
  const canvasRef = useRef(null);

  const [tool, setTool] = useState("brush");
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(5);
  const [darkMode, setDarkMode] = useState(false);

  // Update body background on darkMode change
  useEffect(() => {
    document.body.style.background = darkMode
      ? "linear-gradient(to right, #1a1a1a, #333333)"
      : "linear-gradient(to right, #ffffff, #f0f0f0)";
    document.body.style.color = darkMode ? "#fff" : "#000";
  }, [darkMode]);

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <h1 className="title">🎨 CanvasCraft</h1>

      <Menu
        setTool={setTool}
        setColor={setColor}
        setSize={setSize}
        undo={() => canvasRef.current.undo()}
        redo={() => canvasRef.current.redo()}
        clearCanvas={() => canvasRef.current.clearCanvas()}
        save={() => canvasRef.current.saveImage("png")}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <Canvas ref={canvasRef} tool={tool} color={color} size={size} darkMode={darkMode} />
    </div>
  );
}
