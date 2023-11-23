import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Grid, IconButton, Divider} from "@mui/material";
import "./AboutAcadZen.css";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from "react-router-dom";

function AboutUs() {
    
    // when button is clicked, the screen/scroll view is on the top para nice haha
    const handleButtonClick = () => {
          window.scrollTo(0,0);
        };

    // kani kay para clickable lang ang icons
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
                <Link to="/signup" style={{ textDecoration: 'none' }}><Button style={{ color: '#8C7111', fontWeight: 'bold' }}>Sign up</Button></Link>
                <Box sx={{ marginX: '8px', color: '#8C7111' }}>|</Box>
                <Link to="/login" style={{ textDecoration: 'none' }}><Button style={{ color: '#8C7111', fontWeight: 'bold' }}>Login</Button></Link>
                </div>
            </Toolbar>
        </AppBar>
                <div style={{margin: '0px 60px 0px 60px'}}>
                    <Typography sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '32px', fontWeight: 'bolder', textAlign: 'center', marginTop: '100px'}}>
                        Meet Team GenZen
                    </Typography>
                    <Typography sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '28px', textAlign: 'center', marginTop: '10px'}}>
                        We are Team GenZen, a team of ambitious college students who developed AcadZen. We’re not just developers; <br/>we’re also students, just like you. 
                        We understand the challenges of college life firsthand, and <br/> we’re committed to making it a little bit easier.
                    </Typography>
                    <Typography sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '32px', fontWeight: 'bolder', textAlign: 'center', marginTop: '60px'}}>
                        Our Mission
                    </Typography>
                    <Typography sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '28px', textAlign: 'center', marginTop: '10px'}}>
                        Our mission is to leverage our skills in technology to enhance the academic journey for ourselves and our peers. <br/>
                        We believe in the power of technology to transform learning, and we’re dedicated to making it accessible to all students
                    </Typography>            
                </div>
        <div style={{marginTop: '60px', marginLeft: '70px'}}>
            <Box display="flex" justifyContent="center">
                <Box
                    width={320}
                    height={400}
                    bgcolor="#332D2D"
                    marginRight={10}
                    display="flex"
                    flexDirection={"column"}
                    alignItems="center"
                    justifyContent="center"
                    color="#fff"
                    fontWeight="bold"
                    borderRadius={2}
                    boxShadow= '0px 10px 10px 0px rgba(0, 0, 0, 0.25)'
                >
                    <Box
                    width="200px"
                    height="200px"
                    bgcolor="white" 
                    borderRadius="50%"
                    overflow="hidden"
                    objectFit={"cover"}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    marginTop={"-20px"}
                >
                
                <img src="./KarymeProfile.png" alt="Karyme Profile"
                style={{ width: '200px', height: '200px'}}
                />
                </Box>
                <Typography variant="body1" style={{ fontFamily: 'Numans', fontSize: '22px', marginTop: '20px'}}>
                    Karyme Fatima Crisologo
                </Typography>
                <Typography variant="body1" style={{ fontFamily: 'Oleo Script', fontSize: '20px', margin: '15px 30px 0px 30px', textAlign: 'center'}}>
                    “The best project you’ll ever work on is you”
                </Typography>

                </Box>

                <Box
                    width={320}
                    height={400}
                    bgcolor="#332D2D"
                    marginRight={10}
                    display="flex"
                    flexDirection={"column"}
                    alignItems="center"
                    justifyContent="center"
                    color="#fff"
                    fontWeight="bold"
                    borderRadius={2}
                    boxShadow= '0px 10px 10px 0px rgba(0, 0, 0, 0.25)'
                >
                    <Box
                    width="200px"
                    height="200px"
                    bgcolor="white" 
                    borderRadius="50%"
                    overflow="hidden"
                    objectFit={"cover"}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    marginTop={"-20px"}
                >
                
                <img src="./RovelynProfile.png" alt="Rovelyn Profile"
                style={{ width: '200px', height: '200px'}}
                />
                </Box>
                <Typography variant="body1" style={{ fontFamily: 'Numans', fontSize: '22px', marginTop: '20px'}}>
                    Rovelyn Aguinaldo
                </Typography>
                <Typography variant="body1" style={{ fontFamily: 'Oleo Script', fontSize: '20px', margin: '15px 30px 0px 30px', textAlign: 'center'}}>
                    “Do what makes your <br/> soul shine”
                </Typography>

                </Box>

                <Box
                    width={320}
                    height={400}
                    bgcolor="#332D2D"
                    marginRight={10}
                    display="flex"
                    flexDirection={"column"}
                    alignItems="center"
                    justifyContent="center"
                    color="#fff"
                    fontWeight="bold"
                    borderRadius={2}
                    boxShadow= '0px 10px 10px 0px rgba(0, 0, 0, 0.25)'
                >
                    <Box
                    width="200px"
                    height="200px"
                    bgcolor="white" 
                    borderRadius="50%"
                    overflow="hidden"
                    objectFit={"cover"}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    marginTop={"-20px"}
                >
                
                <img src="./JoshuaProfile.png" alt="Joshua Profile"
                style={{ width: '200px', height: '200px'}}
                />
                </Box>
                <Typography variant="body1" style={{ fontFamily: 'Numans', fontSize: '22px', marginTop: '20px'}}>
                    Joshua Biong
                </Typography>
                <Typography variant="body1" style={{ fontFamily: 'Oleo Script', fontSize: '20px', margin: '15px 30px 0px 30px', textAlign: 'center'}}>
                    “Take those risk, it will be <br/> worth it”
                </Typography>

                </Box>

                <Box
                    width={320}
                    height={400}
                    bgcolor="#332D2D"
                    marginRight={10}
                    display="flex"
                    flexDirection={"column"}
                    alignItems="center"
                    justifyContent="center"
                    color="#fff"
                    fontWeight="bold"
                    borderRadius={2}
                    boxShadow= '0px 10px 10px 0px rgba(0, 0, 0, 0.25)'
                >
                    <Box
                    width="200px"
                    height="200px"
                    bgcolor="white" 
                    borderRadius="50%"
                    overflow="hidden"
                    objectFit={"cover"}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    marginTop={"-50px"}
                >
                
                <img src="./KerchProfile.png" alt="Kerch Profile"
                style={{ width: '200px', height: '200px'}}
                />
                </Box>
                <Typography variant="body1" style={{ fontFamily: 'Numans', fontSize: '22px', marginTop: '20px'}}>
                    Kerch Cabo
                </Typography>
                <Typography variant="body1" style={{ fontFamily: 'Oleo Script', fontSize: '20px', margin: '15px 30px 0px 30px', textAlign: 'center'}}>
                    “Just trust the process”
                </Typography>

                </Box>

            </Box>
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

export default AboutUs;