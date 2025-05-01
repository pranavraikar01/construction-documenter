import React, { useContext } from "react";
import { SiteContext } from "../context/SiteContext";
import ImageCard from "./ImageCard";
import "./ImageGallery.css";

const ImageGallery = () => {
  const { images } = useContext(SiteContext);

  if (images.length === 0) {
    return (
      <div className="image-gallery-empty">
        <h2>Site Images</h2>
        <p className="no-images-message">
          No images added yet. Use the form above to add site images.
        </p>
      </div>
    );
  }

  return (
    <div className="image-gallery-container">
      <h2>Site Images ({images.length})</h2>
      <div className="image-gallery">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
