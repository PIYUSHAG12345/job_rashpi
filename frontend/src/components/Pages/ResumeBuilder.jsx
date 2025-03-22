import React, { useState } from "react";

const ResumeBuilder = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
    alert("Resume uploaded successfully!");
  };

  const handleOverleafRedirect = () => {
    window.open("https://www.overleaf.com", "_blank"); // Opens Overleaf in a new tab
  };

  return (
    <div className="resume-builder">
      <h1>Resume Builder</h1>
      <p>Upload your resume or use Overleaf to create a new one.</p>

      {/* Resume Upload Section */}
      <div className="upload-section">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileUpload}
          id="resume-upload"
          style={{ display: "none" }}
        />
        <label htmlFor="resume-upload" className="upload-button">
          {uploadedFile ? "Change File" : "Upload Resume"}
        </label>
        {uploadedFile && (
          <p className="file-info">
            Uploaded File: <strong>{uploadedFile.name}</strong>
          </p>
        )}
      </div>

      {/* Overleaf Redirect Section */}
      <div className="overleaf-section">
        <button onClick={handleOverleafRedirect} className="overleaf-button">
          Go to Overleaf
        </button>
      </div>
    </div>
  );
};

export default ResumeBuilder;
