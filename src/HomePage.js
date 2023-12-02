import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import styles from './HomePage.module.css';
import LearningSession from './LearningSession';
import UploadDocument from './UploadDocument';
import AboutUs from './AboutUs';
import AboutAcadZen from './AboutAcadZen';
import {Grid, Divider} from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import ProfileSettings from './ProfileSettings';
import FlashcardManagement from './FlashcardManagement';

export default function HomePage() {
    const [user, setUser] = React.useState(null);
    const [showLogin, setShowLogin] = React.useState(false);
    const [hideAppBar, setHideAppBar] = React.useState(false);
    const [isSignInView, setIsSignInView] = React.useState(false);
    const [showHometoabout, setShowHometoabout] = React.useState(true);

    const handleLoginClick = () => {
        setShowLogin(true);
        setHideAppBar(true);
        setIsSignInView(true);
        setShowHometoabout(false);
    };

    const handleSignInClick = () => {
        setShowLogin(true);
        setHideAppBar(true);
        setIsSignInView(false);
        setShowHometoabout(false);
    };

    // when button is clicked, the screen/scroll view is on the top para nice haha
    const handleButtonClick = () => {
        window.scrollTo(0,0);
      };

    // kani kay para clickable lang icons 
    const handleParagraphClick = (item) => {
        console.log(`Clicked on ${item}`);
      };


    return (
        <Router>
            <div className={styles.homebg}>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path='/learningsession' element={<LearningSession />} />
                    <Route path='/uploaddocument' element={<UploadDocument />} />
                    <Route path='/flashcardsmgt' element={<FlashcardManagement />} />
                    <Route path='/aboutus' element={<AboutUs />} />
                    <Route path='/aboutacadzen' element={<AboutAcadZen />} />
                    <Route path="/login" element={<Login isSignInView={isSignInView} setIsSignInView={setIsSignInView} />} />
                    <Route path="/signup" element={<Signup handleToggle={() => setShowLogin(false)} />} />
                    <Route path='/profilesettings' element={<ProfileSettings/>} />
                    <Route
                        path="/"
                        element={
                            <Box sx={{ flexGrow: 1 }}>
                                {!hideAppBar && (
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
                                )}
                                {!hideAppBar && ( 
                                    <div className={styles.contentContainer}>
                                        <div>
                                            <Typography variant="h3" component="div"  style={{fontWeight: 'bold', color:'#FFFFFF', width:'800px', fontSize:'75px'}}>
                                                Elevating College Life for Holistic Success
                                            </Typography>
                                        </div>
                                        <div style={{width:'475px', color:'#787360'}}>
                                            <Typography variant="h6" component="div" style={{fontSize: '25px', fontWeight:'bold'}}>
                                                Transforming Academic Journey with Integrated Flashcards, Dreamboard, and Mental Health Support 
                                            </Typography>
                                        </div>
                                    </div>
                                )}
                                {showHometoabout && (
                                    <div className={styles.homeaboutbg}>
                                        <h1 style={{fontSize:'60px', width:'1100px', marginLeft:'23%'}}>Excel in your courses using our latest set of study resources.</h1>
                                    
                                        <div className={styles.hometoabout}></div>
                                            <div style={{ marginTop:'900px', height:'80vh', display:'flex', flexDirection:'row',marginLeft:'5%' }}>
                                                    <img
                                                        src="uploadimg.png"
                                                        alt="upl"
                                                        style={{
                                                            width: '800px', height:'600px'
                                                        }}
                                                    />
                                                <div style={{marginLeft:'8%',textAlign:'left', height:'600px'}}>
                                                    <div>
                                                    <Typography variant="h3" component="div"  style={{fontWeight: 'bold', color:'#000000', width:'800px', fontSize:'60px'}}>
                                                        Prepare yourself for the day of the test.
                                                    </Typography>
                                                </div>
                                                <div style={{width:'475px', color:'#787360'}}>
                                                    <Typography variant="h6" component="div" style={{fontSize: '25px', fontWeight:'bold'}}>
                                                        Transform your PowerPoint slides into flashcards for accelerated outcomes.
                                                    </Typography>
                                                </div>
                                                <div>
                                                <Link to="/signup" style={{ textDecoration: "none" }}>
                                                    <Button fullWidth
                                                            type="submit"
                                                            variant="contained"
                                                            style={{ width: "30%", borderRadius: "10px", backgroundColor: "#FAC712", color: "black", fontWeight: "bold", marginTop:'30%', fontSize:'100%' }}
                                                        >Get Started
                                                    </Button>
                                                </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.AppInfo}>
                                            <div className={styles.gridItem}>
                                                <h2>About</h2>
                                                <Link to="/aboutus"><Button onClick={handleButtonClick}>About us</Button></Link>
                                                <Link to="/aboutacadzen"><Button onClick={handleButtonClick}>About AcadZen</Button></Link>
                                                <Button>Get the app</Button>
                                            </div>

                                            <div className={styles.gridItem}>
                                                <h2>For Students</h2>
                                                <Button>Flashcards</Button>
                                                <Button>Quiz</Button>
                                                <Button>Learn</Button>
                                            </div>

                                            <div className={styles.gridItem}>
                                                <h2>Resources</h2>
                                                <Button>Terms</Button>
                                                <Button>Guidelines</Button>
                                                <Button>Honor code</Button>
                                            </div>
                                        </div>

                                        <div className={styles.footer}>
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
                                )}
                            </Box>
                        }
                    />
                </Routes>

                {showLogin && (
                    isSignInView ? (
                        <Signup handleToggle={() => setShowLogin(false)} />
                    ) : (
                        <Login isSignInView={isSignInView} setIsSignInView={setIsSignInView} />
                    )
                )}
            </div>
        </Router>
    );
}
