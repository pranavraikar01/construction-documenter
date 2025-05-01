import React, { useState } from "react";
import { SiteProvider } from "./context/SiteContext";
import SiteDetailsForm from "./components/SiteDetailsForm";
import ImageUploader from "./components/ImageUploader";
import ImageGallery from "./components/ImageGallery";
import PDFGenerator from "./components/PDFGenerator";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <SiteProvider>
      <div className="app">
        <header className="app-header">
          <h1>Construction Site Documenter</h1>
          {/* <p>
            Document your construction sites and generate PDFs without a
            database
          </p> */}
          <p>Document your construction sites</p>
        </header>

        <nav className="app-nav">
          <ul>
            <li>
              <button
                className={activeTab === "details" ? "active" : ""}
                onClick={() => setActiveTab("details")}
              >
                Site Details
              </button>
            </li>
            <li>
              <button
                className={activeTab === "images" ? "active" : ""}
                onClick={() => setActiveTab("images")}
              >
                Images
              </button>
            </li>
            <li>
              <button
                className={activeTab === "pdf" ? "active" : ""}
                onClick={() => setActiveTab("pdf")}
              >
                Generate PDF
              </button>
            </li>
          </ul>
        </nav>

        <main className="app-content">
          {activeTab === "details" && (
            <div className="tab-content">
              <SiteDetailsForm />
            </div>
          )}

          {activeTab === "images" && (
            <div className="tab-content">
              <ImageUploader />
              <ImageGallery />
            </div>
          )}

          {activeTab === "pdf" && (
            <div className="tab-content">
              <PDFGenerator />
            </div>
          )}
        </main>

        <footer className="app-footer">
          &copy; 2025 Pranav Raikar. All Rights Reserved.
        </footer>
      </div>
    </SiteProvider>
  );
}

export default App;
