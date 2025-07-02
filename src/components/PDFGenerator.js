import React, { useContext, useRef } from "react";
import { SiteContext } from "../context/SiteContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./PDFGenerator.css";

const PDFGenerator = () => {
  const { siteDetails, images } = useContext(SiteContext);
  const pdfContentRef = useRef(null);

  const generatePDF = async () => {
    if (!siteDetails.siteName) {
      alert("Please fill in site details first");
      return;
    }

    if (images.length === 0) {
      alert("Please add at least one image");
      return;
    }

    const pdfContent = pdfContentRef.current;
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margins = 15; // margins in mm

    try {
      // Show loading indicator
      document.getElementById("loading-indicator").style.display = "block";

      // Make element visible for capturing
      pdfContent.style.visibility = "visible";

      // First page - site details
      const detailsSection = document.getElementById("details-section");
      const detailsCanvas = await html2canvas(detailsSection, { scale: 2 });
      const detailsImgData = detailsCanvas.toDataURL("image/png");

      const detailsImgHeight =
        (detailsCanvas.height * pdfWidth) / detailsCanvas.width;
      pdf.addImage(
        detailsImgData,
        "PNG",
        margins,
        margins,
        pdfWidth - margins * 2,
        detailsImgHeight * 0.9 // Slightly reduce height to fit better
      );

      // Add images with descriptions on new pages
      for (let i = 0; i < images.length; i++) {
        pdf.addPage();

        const imageSection = document.getElementById(`image-section-${i}`);
        const imageCanvas = await html2canvas(imageSection, { scale: 2 });
        const imageImgData = imageCanvas.toDataURL("image/png");

        const imageImgHeight =
          (imageCanvas.height * pdfWidth) / imageCanvas.width;
        pdf.addImage(
          imageImgData,
          "PNG",
          margins,
          margins,
          pdfWidth - margins * 2,
          imageImgHeight * 0.9 // Slightly reduce height to fit better
        );
      }

      // Hide content after capturing
      pdfContent.style.visibility = "hidden";

      // Save PDF
      pdf.save(
        `site-documentation-${siteDetails.siteName
          .replace(/\s+/g, "-")
          .toLowerCase()}.pdf`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      // Hide loading indicator
      document.getElementById("loading-indicator").style.display = "none";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="pdf-generator-container">
      <h2>Generate Documentation PDF</h2>

      <div id="loading-indicator" className="loading-indicator">
        Generating PDF... Please wait.
      </div>

      <button onClick={generatePDF} className="generate-pdf-button">
        Generate PDF
      </button>

      {/* Hidden content that will be rendered to PDF */}
      <div ref={pdfContentRef} className="pdf-content">
        {/* Site Details Section */}
        <div id="details-section" className="pdf-section">
          <h1 className="pdf-title">Construction Site Documentation</h1>
          <h2 className="pdf-subtitle">{siteDetails.siteName}</h2>

          <div className="pdf-details">
            <div className="pdf-detail-item">
              <strong>Location:</strong>{" "}
              {siteDetails.location || "Not specified"}
            </div>
            <div className="pdf-detail-item">
              <strong>Project Manager:</strong>{" "}
              {siteDetails.projectManager || "Not specified"}
            </div>
            <div className="pdf-detail-item">
              <strong>Start Date:</strong> {formatDate(siteDetails.startDate)}
            </div>
            <div className="pdf-detail-item pdf-description">
              <strong>Description:</strong>
              <p>{siteDetails.description || "No description provided."}</p>
            </div>
          </div>
        </div>

        {/* Images Sections - One per page */}
        {images.map((image, index) => (
          <div
            id={`image-section-${index}`}
            key={image.id}
            className="pdf-section pdf-image-section"
          >
            <h3 className="pdf-image-title">Image {index + 1}</h3>
            <div className="pdf-image-container">
              <img
                src={image.data}
                alt={`Site image ${index + 1}`}
                className="pdf-image"
              />
            </div>
            <div className="pdf-image-description">
              <p>
                <strong>Description:</strong>
              </p>
              <p>{image.description}</p>
              <p className="pdf-image-timestamp">
                <small>
                  Added: {new Date(image.timestamp).toLocaleString()}
                </small>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PDFGenerator;
