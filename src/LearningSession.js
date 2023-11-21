import React from "react";
import "./LearningSession.css";
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

function UploadDocument() {
    return (
    <>
        <AppBar position="static" style={{background: 'none', boxShadow: 'none', padding: '10px', marginTop: '20px'}}>
            <Toolbar>
                <img src= "/logo.png" alt="App Logo" style={{width: 100, marginLeft: '50px'}}/>
                <Typography variant="h3" style={{fontFamily: 'Poppin, sans-serif', fontWeight: '600', fontSize: '40px',color: '#B18A00'}}
                >AcadZen
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '10px', marginLeft: '100px'}}>
                    <div style={{ background: 'white', borderRadius: '15px', textAlign: 'center', height: '55px', width: '1101px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}>
                        <Typography variant="h4" style={{ fontFamily: "Roboto Condensed", fontSize: '35px',color: '#332D2D', textAlign: 'center', lineHeight: '55px' }}
                        >Learning Session
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

        <div className="center-panel">
            <div className="inner-panel">
            
            </div>
    
        </div>

        {/* Right Panel for Displaying Uploaded Files */}
        
    </>
    );
}

export default UploadDocument;