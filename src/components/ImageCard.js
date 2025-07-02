import React, { useState, useContext } from "react";
import { SiteContext } from "../context/SiteContext";
import "./ImageCard.css";
import MeasurementCanvas from "./MeasurementCanvas";

const ImageCard = ({ image }) => {
  const { removeImage, updateImageDescription, updateImageData } =
    useContext(SiteContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(image.description);
  const [showMeasurement, setShowMeasurement] = useState(false);

  const formattedDate = new Date(image.timestamp).toLocaleString();

  const handleSaveDescription = () => {
    updateImageDescription(image.id, editedDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedDescription(image.description);
    setIsEditing(false);
  };

  const handleMeasurementSave = (annotatedImage, measurements) => {
    updateImageData(image.id, annotatedImage, measurements);
    setShowMeasurement(false);
  };

  return (
    <div className="image-card">
      <div className="image-container">
        <img
          src={image.data}
          alt={image.description}
          className="uploaded-image"
        />
      </div>

      <div className="image-details">
        <div className="image-timestamp">Added: {formattedDate}</div>

        {isEditing ? (
          <div className="description-edit">
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="description-textarea"
              rows="3"
            ></textarea>
            <div className="edit-buttons">
              <button onClick={handleSaveDescription} className="save-button">
                Save
              </button>
              <button onClick={handleCancel} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="description-display">
            <p>{image.description}</p>
            <div className="action-buttons">
              <button
                onClick={() => setIsEditing(true)}
                className="edit-button"
              >
                Edit
              </button>
              <button
                onClick={() => removeImage(image.id)}
                className="delete-button"
              >
                Delete
              </button>
              <button
                onClick={() => setShowMeasurement(true)}
                className="measure-button"
              >
                📏 Measure
              </button>
            </div>
          </div>
        )}
      </div>

      {showMeasurement && (
        <MeasurementCanvas
          imageSrc={image.data}
          onClose={() => setShowMeasurement(false)}
          onSave={handleMeasurementSave}
        />
      )}
    </div>
  );
};

export default ImageCard;
