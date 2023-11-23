import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Grid, IconButton, Divider} from "@mui/material";
import "./AboutAcadZen.css";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from "react-router-dom";

function AboutAcadZen() {

    // when button is clicked, the screen/scroll view is on the top para nice haha
    const handleButtonClick = () => {
        window.scrollTo(0,0);
      };

    // kani kay para clickable lang icons 
    const handleParagraphClick = (item) => {
        console.log(`Clicked on ${item}`);
      };

    return (
        <>
        <div className="welcome-back-page">
        <div className = "AboutBg">
        <AppBar position="fixed" style={{ background: 'white' }}>
            <Toolbar
                sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/logo.png" alt="App Logo" style={{ width: 60 }} />
                <Typography
                    variant="h4"
                    sx={{
                    fontFamily: 'Poppin, sans-serif',
                    fontWeight: '600',
                    fontSize: '30px',
                    color: '#B18A00',
                    marginLeft: '8px', // Adjust the spacing as needed
                    }}
                >
                    AcadZen
                </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button style={{ color: '#8C7111', fontWeight: 'bold' }}>Sign up</Button>
                <Box sx={{ marginX: '8px', color: '#8C7111' }}>|</Box>
                <Button style={{ color: '#8C7111', fontWeight: 'bold' }}>Login</Button>
                </div>
            </Toolbar>
        </AppBar>
                <div style={{margin: '0 60px 0 60px'}}>
                    <Typography sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '32px', fontWeight: 'bold', textAlign: 'center', marginTop: '100px'}}>
                        About AcadZen
                    </Typography>
                    <Typography sx={{fontFamily: 'Inter', fontSize: '28px', textAlign: 'center', marginTop: '40px'}}>
                    AcadZen is a revolutionary web application designed to empower college students to excel acadically and personally. 
                    We understand the challenges of college life, and we’re here to help you navigate them <br/> with ease and efficiency.
                    </Typography>           
                </div>
        <div style={{marginTop: '60px'}}>
            <Typography sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '32px', fontWeight: 'bold', textAlign: 'center', marginBottom: '30px'}}>
                Our Features
            </Typography>
            <Box display="flex" justifyContent="center">
                <Box
                    width={320}
                    height={350}
                    bgcolor="#332D2D"
                    marginRight={15}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="#fff"
                    fontWeight="bold"
                    borderRadius={2}
                    boxShadow= '0px 10px 10px 0px rgba(0, 0, 0, 0.25)'
                >
                    <Typography variant="body1" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '23px', textAlign: 'left', margin: '0px 15px 20px 20px'}}> 
                    <strong>Document-to-Flashcard Conversion</strong> <br/> 
                        Our AI-powered tool transforms your academic documents (PDF, PPT, TXT) into flashcards, 
                        making study preparation efficient and effective.
                    </Typography>
                </Box>

                <Box
                    width={320}
                    height={350}
                    bgcolor="#332D2D"
                    marginRight={15}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="#fff"
                    fontWeight="bold"
                    borderRadius={2}
                    boxShadow= '0px 10px 10px 0px rgba(0, 0, 0, 0.25)'
                >
                    <Typography variant="body1" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '23px', textAlign: 'left', margin: '0px 15px 20px 20px'}}> 
                    <strong>Dreamboard</strong> <br/> 
                     Visualize your goals and track your progress with our interactive dreamboard. It’s a powerful tool for motivation and personal growth.
                    </Typography>
                </Box>

                <Box
                    width={320}
                    height={350}
                    bgcolor="#332D2D"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="#fff"
                    fontWeight="bold"
                    borderRadius={2}
                    boxShadow= '0px 10px 10px 0px rgba(0, 0, 0, 0.25)'
                >
                    <Typography variant="body1" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '23px', textAlign: 'left', margin: '0px 15px 20px 20px'}}> 
                    <strong>Mental Health Reminders & Quotes</strong> <br/>
                    We care about your well-being. Our platform sends you regular reminders and motivational quotes to keep you inspired and mentally healthy.
                    </Typography>
                </Box>
            </Box>
        </div>

            <div style={{margin: '70px 60px 0 60px'}}>
                <Typography sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '32px', fontWeight: 'bold', textAlign: 'center'}}>
                    Our Vision
                </Typography>
                <Typography sx={{fontFamily: 'Inter', fontSize: '28px', textAlign: 'center', marginTop: '30px'}}> 
                At AcadZen, we believe in holistic growth and well-being. We aim to provide a user-friendly hub that fosters academic excellence, personal development, and mental health.
                We’re not just another educational platform; <br/>we’re a community committed to helping you thrive during your college journey.
                </Typography>   
            </div>
        </div>

        <div className="AppInfo">
            <div className="grid-item">
                <h2>About</h2>
                <Link to="/aboutus"><Button onClick={handleButtonClick}>About us</Button></Link>
                <Link to="/aboutacadzen"><Button onClick={handleButtonClick}>About AcadZen</Button></Link>
                <Button>Get the app</Button>
            </div>

            <div className="grid-item">
                <h2>For Students</h2>
                <Button>Flashcards</Button>
                <Button>Quiz</Button>
                <Button>Learn</Button>
            </div>

            <div className="grid-item">
                <h2>Resources</h2>
                <Button>Terms</Button>
                <Button>Guidelines</Button>
                <Button>Honor code</Button>
            </div>
         </div>

        <div className="footer">
            <Divider style={{ marginBottom: '16px', backgroundColor: '#C8C8C8' }} />
            <Grid container spacing={4} justifyContent="center">
            <Grid item>
                <IconButton onClick={() => handleParagraphClick('Icon 1')}>
                <InstagramIcon style={{fontSize: '60px', color: 'black'}}/>
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton onClick={() => handleParagraphClick('Icon 2')}>
                <FacebookIcon style={{fontSize: '60px', color: 'black'}} />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton onClick={() => handleParagraphClick('Icon 3')}>
                <TwitterIcon style={{fontSize: '60px', color: 'black'}} />
                </IconButton>
            </Grid>
            </Grid>
                <Typography variant="h6" mt={2}>
                    Privacy Policy &nbsp; | &nbsp; Cookie Policy &nbsp; | &nbsp; Legal Notice &nbsp; | &nbsp; Accessibility Policy &nbsp; | &nbsp; Cookie Settings
                </Typography>
                <Typography variant="body2" mt={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <LanguageIcon style={{ marginRight: '6px' }} />
                    <strong>Philippines - English</strong>
                </Typography>
                <Typography variant="body2" mt={2}>
                    © 2023 AcadZen Inc.
                </Typography>
        </div>
        </div>
        </>
    );
}

export default AboutAcadZen;