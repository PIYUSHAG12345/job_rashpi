import { useState } from "react";
import axios from "axios";

const UploadResume = () => {
    const [file, setFile] = useState(null);
    const [score, setScore] = useState(null);

    const handleUpload = async () => {
        if (!file) return alert("Please select a resume!");

        const formData = new FormData();
        formData.append("resume", file);

        const response = await axios.post("http://localhost:4000/upload", formData);
        setScore(response.data.score);
    };

    return (
        <div className="upload-container">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload & Get AI Score</button>
            {score !== null && <p>Resume Score: {score}/100</p>}
        </div>
    );
};

export default UploadResume;
