import React from "react";
import "./UploadDocument.css";
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from 'react';
import { Link } from "react-router-dom";


function UploadDocument() {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleBrowseClick = () => {
        document.getElementById('fileInput').click();
      };
    
      const handleFileChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
          // Set the selected file for preview
          setSelectedFile(file);
        }
      };
    
      const handleUploadClick = () => {
        // Implement your upload logic here
        console.log('Upload button clicked');
      };

      const getFileType = (fileName) => {
        const extension = fileName.split('.').pop().toLowerCase();
        return extension;
      };
    
    return (
    <>
    <div className="welcome-back-page">
    <div className="lsbody">
        <AppBar style={{background: 'none', boxShadow: 'none', padding: '10px', marginTop: '20px'}}>
            <Toolbar>
                <img src= "/logo.png" alt="App Logo" style={{width: 100, marginLeft: '50px'}}/>
                <Typography variant="h3" style={{fontFamily: 'Poppin, sans-serif', fontWeight: '600', fontSize: '40px',color: '#B18A00'}}
                >AcadZen
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '10px', marginLeft: '50px'}}>
                    <div style={{ background: 'white', borderRadius: '15px', textAlign: 'center', height: '55px', width: '1101px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}>
                        <Typography variant="h4" style={{ fontFamily: "Roboto Condensed", fontSize: '35px',color: '#332D2D', textAlign: 'center' }}
                        >Document to Flashcard Converter
                        </Typography>
                    </div>
                </div>
                <Box style={{ background: 'white', borderRadius: '10px', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '70px'}}>
                    <Box style={{ background: '#FAC712', borderRadius: '10px', width: '50px', height: '50px'}}>
                        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                        <IconButton color="black" style={{ fontSize: '45px' }}>
                        <HomeIcon style={{ fontSize: '80%', width: '100%' }} />
                        </IconButton>
                    </Link>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>

        <div className="upload-document-content">
            
            <div className="left-panel">
            {/* File preview or document icon */}
            {selectedFile ? (
                <div style={{ marginBottom: '10px', width: '100%'}}>
                {getFileType(selectedFile.name) === 'pdf' ? (
                    <embed src={URL.createObjectURL(selectedFile)} type="application/pdf" width="40%" height="300px"/>
                ) : getFileType(selectedFile.name) === 'docx' ? (
                    // Displaying a placeholder icon for DOCX files
                    <img
                    src="/docx-icon.png"
                    alt="DOCX Icon"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                    />
                ) : (
                    <img
                    src="/document icon.png"
                    alt="File Preview"
                    style={{ width: '70%', maxHeight: '100px', objectFit: 'cover', borderRadius: '10px' }}
                    />
                )}
                </div>
            ) : (
                <img
                src="/document icon.png"
                alt="Document Icon"
                style={{ width: 100, marginTop: '130px', marginBottom: '30px' }}
                />
            )}

            {/* Display file name or Supported document types */}
            {selectedFile ? (
                <Typography
                variant="h4"
                style={{
                    fontFamily: 'Roboto Condensed',
                    fontSize: '20px',
                    color: 'black',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                    marginTop: '15px',
                }}
                >
                {selectedFile.name}
                </Typography>
            ) : (
                <Typography
                variant="h4"
                style={{
                    fontFamily: 'Roboto Condensed',
                    fontSize: '20px',
                    color: 'black',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    marginTop: '10px',
                }}
                >
                Supported document types: PDF, DOCX, TXT, PPTX
                </Typography>
            )}

            {/* Browse Button */}
            <div style={{ marginTop: '70px'}}>
                <Button style={{ background: '#FAC712', width: '230px', height: '45px', borderRadius: '10px' }} onClick={handleBrowseClick}>
                <Typography style={{ fontSize: '20px', fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', color: '#332D2D', textTransform: 'none' }}>
                    Browse
                </Typography>
                </Button>
                {/* Hidden file input */}
                <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
            </div>

            {/* Upload Document Button */}
                <Button style={{ background: '#FAC712', width: '230px', height: '45px', borderRadius: '10px', marginTop: '150px' }} onClick={handleUploadClick}>
                <Typography style={{ fontSize: '20px', fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', color: '#332D2D', textTransform: 'none' }}>
                    Upload Document
                </Typography>
                </Button>
            </div>

            {/* Right Panel for Displaying Uploaded Files */}
            <div className="right-panel">
            <Typography variant="h4" style={{ fontFamily: 'Roboto Condensed', fontSize: '30px', color: '#332D2D', textAlign: 'left', margin: '10px' }}>
                Uploaded Documents
            </Typography>
            {/* Add your file display components here */}
            </div>
        </div>
        </div>
    </div>
    </>
    );
}

export default UploadDocument;
