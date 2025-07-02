import React, { createContext, useState, useEffect } from "react";

// Create context
export const SiteContext = createContext();

// Create provider component
export const SiteProvider = ({ children }) => {
  // State for site details
  const [siteDetails, setSiteDetails] = useState({
    siteName: "",
    location: "",
    projectManager: "",
    startDate: "",
    description: "",
  });

  // State for images with descriptions
  const [images, setImages] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedSiteDetails = localStorage.getItem("siteDetails");
    const savedImages = localStorage.getItem("siteImages");

    if (savedSiteDetails) {
      setSiteDetails(JSON.parse(savedSiteDetails));
    }

    if (savedImages) {
      setImages(JSON.parse(savedImages));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("siteDetails", JSON.stringify(siteDetails));
  }, [siteDetails]);

  useEffect(() => {
    localStorage.setItem("siteImages", JSON.stringify(images));
  }, [images]);

  // Function to update site details
  const updateSiteDetails = (details) => {
    setSiteDetails({ ...siteDetails, ...details });
  };

  // Function to add an image with description
  const addImage = (imageData, description) => {
    const newImage = {
      id: Date.now(), // Simple unique ID
      data: imageData,
      description: description,
      timestamp: new Date().toISOString(),
    };

    setImages([...images, newImage]);
  };

  // Function to remove an image
  const removeImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  // Function to update image description
  const updateImageDescription = (id, description) => {
    setImages(
      images.map((image) =>
        image.id === id ? { ...image, description: description } : image
      )
    );
  };

  // Function to update image data + measurements
  const updateImageData = (id, newImageData, measurements) => {
    setImages(
      images.map((image) =>
        image.id === id ? { ...image, data: newImageData, measurements } : image
      )
    );
  };

  // Function to clear all data
  const clearAllData = () => {
    setSiteDetails({
      siteName: "",
      location: "",
      projectManager: "",
      startDate: "",
      description: "",
    });
    setImages([]);
    localStorage.removeItem("siteDetails");
    localStorage.removeItem("siteImages");
  };

  return (
    <SiteContext.Provider
      value={{
        siteDetails,
        images,
        updateSiteDetails,
        addImage,
        removeImage,
        updateImageDescription,
        updateImageData, // new clean function
        clearAllData,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};
