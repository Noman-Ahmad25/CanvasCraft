import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";

const Canvas = forwardRef(({ tool, color, size }, ref) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [snapshot, setSnapshot] = useState(null);

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

  const saveImage = (format) => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = `drawing.${format}`;
    link.href = canvas.toDataURL(`image/${format}`);
    link.click();
  };

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDrawing = (e) => {
    const pos = getPos(e);
    setStartPos(pos);
    setIsDrawing(true);

    saveState();
    const ctx = ctxRef.current;

    if (tool === "brush" || tool === "eraser") {
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
    } else {
      setSnapshot(ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = ctxRef.current;
    const { x, y } = getPos(e);

    if (tool === "brush" || tool === "eraser") {
      ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
      ctx.lineTo(x, y);
      ctx.stroke();
      return;
    }

    ctx.putImageData(snapshot, 0, 0);

    const { x: sx, y: sy } = startPos;
    ctx.beginPath();

    switch (tool) {
      case "line":
        ctx.moveTo(sx, sy);
        ctx.lineTo(x, y);
        break;
      case "rect":
        ctx.strokeRect(sx, sy, x - sx, y - sy);
        break;
      case "circle":
        const r = Math.sqrt((x - sx) ** 2 + (y - sy) ** 2);
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        break;
      default:
        break;
    }

    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  useImperativeHandle(ref, () => ({
    undo,
    redo,
    clearCanvas,
    saveImage,
  }));

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={(e) => startDrawing(e.touches[0])}
  onTouchMove={(e) => {
    e.preventDefault();
    draw(e.touches[0]);
  }}
  onTouchEnd={stopDrawing}
      className="canvas"
    />
  );
});

export default Canvas;
