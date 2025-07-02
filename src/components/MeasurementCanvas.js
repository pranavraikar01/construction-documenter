import React, { useRef, useState } from "react";
import "./MeasurementCanvas.css";

const MeasurementCanvas = ({ imageSrc, onClose, onSave }) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [referenceDistance, setReferenceDistance] = useState("");
  const [measurements, setMeasurements] = useState([]);

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newPoints = [...points, { x, y }];
    setPoints(newPoints);

    redrawCanvas(newPoints, measurements);
  };

  const redrawCanvas = (pts, measures) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);

    // Draw lines
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    for (let i = 0; i < pts.length; i += 2) {
      if (pts[i + 1]) {
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[i + 1].x, pts[i + 1].y);
        ctx.stroke();
      }
    }

    // Draw labels
    ctx.fillStyle = "blue";
    ctx.font = "14px Arial";
    measures.forEach((m) => {
      const midX = (m.from.x + m.to.x) / 2;
      const midY = (m.from.y + m.to.y) / 2;
      ctx.fillText(`${m.value} m`, midX, midY);
    });
  };

  const calculateDistances = () => {
    if (points.length < 2 || !referenceDistance) {
      alert(
        "Please set a reference by marking 2 points and entering real-world distance."
      );
      return;
    }

    const refPxDist = Math.hypot(
      points[1].x - points[0].x,
      points[1].y - points[0].y
    );
    const pxPerUnit = refPxDist / parseFloat(referenceDistance);
    const newMeasurements = [];

    for (let i = 2; i < points.length; i += 2) {
      if (points[i + 1]) {
        const pxDist = Math.hypot(
          points[i + 1].x - points[i].x,
          points[i + 1].y - points[i].y
        );
        const realDist = (pxDist / pxPerUnit).toFixed(2);
        newMeasurements.push({
          from: points[i],
          to: points[i + 1],
          value: realDist,
        });
      }
    }

    setMeasurements(newMeasurements);
    redrawCanvas(points, newMeasurements);
  };

  const handleSave = () => {
    const canvasData = canvasRef.current.toDataURL("image/png");
    onSave(canvasData, measurements);
  };

  const handleImageLoad = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(
      imageRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  return (
    <div className="measurement-overlay">
      <div className="toolbar">
        <input
          type="number"
          placeholder="Reference distance (m)"
          value={referenceDistance}
          onChange={(e) => setReferenceDistance(e.target.value)}
        />
        <button onClick={calculateDistances}>Measure</button>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>

      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onClick={handleCanvasClick}
      />
      <img
        ref={imageRef}
        src={imageSrc}
        alt="Measurement Reference"
        className="background-img"
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default MeasurementCanvas;
