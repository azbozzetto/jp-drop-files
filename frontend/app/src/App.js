import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Ensure the CSS file is correctly imported

const App = () => {
    const [file, setFile] = useState(null);

    const handleDragOver = (e) => {
        e.preventDefault(); // Prevent file from being opened
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setFile(e.dataTransfer.files[0]); // Set the file to state
    };

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        try {
            await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('File uploaded successfully');
        } catch (err) {
            console.error(err);
            alert('File upload failed');
        }
    };

    return (
        <div className="container">
            <div className="upload-area" onDragOver={handleDragOver} onDrop={handleDrop}>
                <i className="icon">{"</>"}</i>
                <p className="drag-text">Drag images here</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="file-upload" className="custom-file-upload">
                        Or, if you prefer...
                        <button>Browse...</button>
                    </label>
                    <input id="file-upload" type="file" onChange={handleFileChange}/>
                    {file && <span>{file.name}</span>}
                    <button type="submit">Upload</button>
                </form>
            </div>
        </div>
    );
};

export default App;
