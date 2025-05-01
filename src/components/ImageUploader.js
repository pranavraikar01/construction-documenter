import React, { useContext, useState } from "react";
import { SiteContext } from "../context/SiteContext";
import "./ImageUploader.css";

const ImageUploader = () => {
  const { addImage } = useContext(SiteContext);
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [previewSrc, setPreviewSrc] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Check file type
    if (!file.type.match("image.*")) {
      alert("Please select an image file");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }

    setIsUploading(true);

    // Create file reader to read the file as data URL
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewSrc(reader.result);
      setIsUploading(false);
    };

    reader.onerror = () => {
      alert("Error reading the file");
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!previewSrc) {
      alert("Please select an image");
      return;
    }

    addImage(previewSrc, description);

    // Reset form
    setDescription("");
    setPreviewSrc("");

    // Reset file input
    e.target.reset();
  };

  return (
    <div className="image-uploader-container">
      <h2>Upload Site Image</h2>
      <form onSubmit={handleSubmit} className="image-uploader-form">
        <div className="file-input-container">
          <label htmlFor="image-upload" className="file-input-label">
            {previewSrc ? "Change Image" : "Select Image"}
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
        </div>

        {isUploading && <div className="loading-indicator">Loading...</div>}

        {previewSrc && (
          <div className="image-preview-container">
            <img src={previewSrc} alt="Preview" className="image-preview" />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="description">Image Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what's shown in the image..."
            rows="3"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="upload-button"
          disabled={!previewSrc || isUploading}
        >
          Add Image
        </button>
      </form>
    </div>
  );
};

export default ImageUploader;
