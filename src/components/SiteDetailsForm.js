import React, { useContext, useState } from "react";
import { SiteContext } from "../context/SiteContext";
import "./SiteDetailsForm.css";

const SiteDetailsForm = () => {
  const { siteDetails, updateSiteDetails } = useContext(SiteContext);
  const [formData, setFormData] = useState(siteDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSiteDetails(formData);
    alert("Site details updated!");
  };

  return (
    <div className="site-details-container">
      <h2>Construction Site Details</h2>
      <form onSubmit={handleSubmit} className="site-details-form">
        <div className="form-group">
          <label htmlFor="siteName">Site Name</label>
          <input
            type="text"
            id="siteName"
            name="siteName"
            value={formData.siteName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="projectManager">Project Manager</label>
          <input
            type="text"
            id="projectManager"
            name="projectManager"
            value={formData.projectManager}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Site Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-button">
          Save Details
        </button>
      </form>
    </div>
  );
};

export default SiteDetailsForm;
