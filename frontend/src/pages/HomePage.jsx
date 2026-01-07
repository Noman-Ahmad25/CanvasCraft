import { useRef, useEffect, useState } from "react";
import Canvas from "../component/Canvas";
import Menu from "../component/Menu";

export default function HomePage({ imageToLoad, darkMode }) {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState("brush");
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(5);
  const [selectedFormat, setSelectedFormat] = useState("png");
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    if (imageToLoad && canvasRef.current) {
      canvasRef.current.loadFromImage(imageToLoad);
    }
  }, [imageToLoad]);

  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      console.log("Auto-saving progress...");
      handleBackendSave();
    }, 300000);

    return () => clearInterval(autoSaveInterval);
  }, []);

  const handleBackendSave = async () => {
    setStatus({ type: "loading", message: "Saving to cloud..." });
    try {
      await canvasRef.current?.saveCanvasToBackend();
      setStatus({ type: "success", message: "✔ Progress saved successfully!" });
      setTimeout(() => setStatus({ type: "", message: "" }), 3000);
    } catch (error) {
      setStatus({ type: "error", message: "✖ Save failed. Please try again." });
      setTimeout(() => setStatus({ type: "", message: "" }), 4000);
    }
  };

  return (
    <div className="page-content">
      {status.message && <div className={`status-toast ${status.type}`}>{status.message}</div>}
      <main className="main-editor">
        <Menu
          setTool={setTool}
          setColor={setColor}
          setSize={setSize}
          undo={() => canvasRef.current?.undo()}
          redo={() => canvasRef.current?.redo()}
          clearCanvas={() => canvasRef.current?.clearCanvas()}
          save={(format) => canvasRef.current?.saveImage(format)}
          saveCanvasToBackend={handleBackendSave}
          isSaving={status.type === "loading"}
          selectedFormat={selectedFormat}
          setSelectedFormat={setSelectedFormat}
        />
        <Canvas ref={canvasRef} tool={tool} color={color} size={size} darkMode={darkMode} />
      </main>
    </div>
  );
}