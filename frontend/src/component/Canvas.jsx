import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { createCanvas } from "../services/canvasApi";

const Canvas = forwardRef(({ tool, color, size, darkMode }, ref) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const drawingState = useRef({ isDrawing: false, startPos: { x: 0, y: 0 } });
  const undoStack = useRef([]);
  const redoStack = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth - 40;
    canvas.height = window.innerHeight - 180;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctxRef.current = ctx;
    saveState();
  }, []);

  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = color;
      ctxRef.current.lineWidth = size;
    }
  }, [color, size]);

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth - 40;
      canvas.height = window.innerHeight - 180;
      saveState();
    };

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const saveState = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!ctx) return;
    undoStack.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    redoStack.current = [];
  };

  const undo = () => {
    if (undoStack.current.length <= 1) return;
    const ctx = ctxRef.current;
    redoStack.current.push(undoStack.current.pop());
    const previous = undoStack.current[undoStack.current.length - 1];
    ctx.putImageData(previous, 0, 0);
  };

  const redo = () => {
    if (!redoStack.current.length) return;
    const ctx = ctxRef.current;
    const restored = redoStack.current.pop();
    undoStack.current.push(restored);
    ctx.putImageData(restored, 0, 0);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    saveState();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const getFlattenedDataURL = (format) => {
    const canvas = canvasRef.current;
    const virtualCanvas = document.createElement("canvas");
    virtualCanvas.width = canvas.width;
    virtualCanvas.height = canvas.height;
    const vCtx = virtualCanvas.getContext("2d");
    vCtx.fillStyle = darkMode ? "#222" : "#fff";
    vCtx.fillRect(0, 0, virtualCanvas.width, virtualCanvas.height);
    vCtx.drawImage(canvas, 0, 0);
    return virtualCanvas.toDataURL(`image/${format}`);
  };

  const saveImage = (format) => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = `design.${format}`;
    link.href = getFlattenedDataURL(format);
    link.click();
  };

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDrawing = (e) => {
    const pos = getPos(e);
    drawingState.current.startPos = pos;
    drawingState.current.isDrawing = true;
    saveState();
    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over";
    if (tool !== "eraser") ctx.strokeStyle = color;
  };

  const draw = (e) => {
    if (!drawingState.current.isDrawing) return;
    const { x, y } = getPos(e);
    const ctx = ctxRef.current;

    if (tool === "brush" || tool === "eraser") {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    drawingState.current.isDrawing = false;
  };

  const saveCanvasToBackend = async () => {
    try {
      const image = canvasRef.current.toDataURL("image/png");
      await createCanvas({ title: "My Canvas", image });
      console.log("Saved!");
    } catch (e) {
      console.error("Error saving canvas:", e.message);
    }
  };

  useImperativeHandle(ref, () => ({
    undo,
    redo,
    clearCanvas,
    saveImage,
    saveCanvasToBackend,
  }));

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={(e) => startDrawing(e.touches[0])}
      onTouchMove={(e) => draw(e.touches[0])}
      onTouchEnd={stopDrawing}
      className={darkMode ? "dark" : "light"}
    />
  );
});

export default Canvas;