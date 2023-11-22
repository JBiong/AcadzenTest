import React from "react";
import "./UploadDocument.css";
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

function UploadDocument() {
    return (
    <>
    <div className="welcome-back-page">
        <AppBar style={{background: 'none', boxShadow: 'none', padding: '10px', marginTop: '20px'}}>
            <Toolbar>
                <img src= "/logo.png" alt="App Logo" style={{width: 100, marginLeft: '50px'}}/>
                <Typography variant="h3" style={{fontFamily: 'Poppin, sans-serif', fontWeight: '600', fontSize: '40px',color: '#B18A00'}}
                >AcadZen
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '10px', marginLeft: '100px'}}>
                    <div style={{ background: 'white', borderRadius: '15px', textAlign: 'center', height: '55px', width: '1101px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}>
                        <Typography variant="h4" style={{ fontFamily: "Roboto Condensed", fontSize: '35px',color: '#332D2D', textAlign: 'center' }}
                        >Document to Flashcard Converter
                        </Typography>
                    </div>
                </div>
                <Box style={{ background: 'white', borderRadius: '10px', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '70px'}}>
                    <Box style={{ background: '#FAC712', borderRadius: '10px', width: '50px', height: '50px'}}>
                        <IconButton color="black" style={{ fontSize: '45px'}}>
                        <HomeIcon style={{ fontSize: '80%', width: '100%'}} />
                        </IconButton>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>

        <div className="upload-document-content">
            {/* Left Panel for Browsing/Uploading Files */}
            <div className="left-panel">
                <img src= "/document icon.png" alt="Document Icon" style={{width: 100, marginTop: '120px', marginBottom: '30px'}}/>
                <Typography variant="h4" style={{ fontFamily: 'Roboto Condensed', fontSize: '20px', color: 'black', textAlign: 'center', fontWeight: 'bold'}}>
                    Supported document types: PDF, DOCX, TXT, PPTX
                </Typography>
                <div style={{marginTop: '60px'}}>
                <Button style={{background: '#FAC712', width: '230px', height: '45px', borderRadius: '10px'}}> 
                    <Typography style={{fontSize: '20px', fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', color: '#332D2D', textTransform: 'none'}}>
                        Browse 
                    </Typography> 
                </Button>
                </div>
                <Button style={{background: '#FAC712', width: '230px', height: '45px', borderRadius: '10px', marginTop: '170px'}}> 
                    <Typography style={{fontSize: '20px', fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', color: '#332D2D', textTransform: 'none'}}>
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
    </>
    );
}

export default UploadDocument;
