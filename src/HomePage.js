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
import UploadDocument from './LearningSession';

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

    return (
        <Router>
            <div className={styles.homebg}>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path='/learningsession' element={<UploadDocument />} />
                    <Route path="/login" element={<Login isSignInView={isSignInView} setIsSignInView={setIsSignInView} />} />
                    <Route path="/signup" element={<Signup handleToggle={() => setShowLogin(false)} />} />
                    <Route
                        path="/"
                        element={
                            <Box sx={{ flexGrow: 1 }}>
                                {!hideAppBar && (
                                    <AppBar position="static" style={{ backgroundColor: '#FFFFFF' }}>
                                        <Toolbar>
                                            <IconButton
                                                size="large"
                                                edge="start"
                                                color="inherit"
                                                aria-label="menu"
                                                sx={{ mr: 2 }}
                                            >
                                                <img
                                                    src="logo.png"
                                                    alt="AcadZen Logo"
                                                    style={{
                                                        width: '90px',
                                                    }}
                                                />
                                            </IconButton>
                                            <Typography variant="h4" className={styles.homeacadzen} style={{ fontWeight: 'bold', fontSize: '45px' }}>
                                                AcadZen
                                            </Typography>
                                            <>
                                                <Link to="/signup" style={{ textDecoration: 'none' }}>
                                                    <Button style={{ color: "#8C7111", fontWeight: 'bold' }}>Sign up</Button>
                                                </Link>
                                                <Box sx={{ margin: '0 8px', color: '#8C7111' }}>|</Box>
                                                <Link to="/login" style={{ textDecoration: 'none' }}>
                                                    <Button style={{ color: "#8C7111", fontWeight: 'bold' }}>Login</Button>
                                                </Link>
                                            </>
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
                                        <h1 style={{fontSize:'60px', width:'1100px', marginLeft:'18%'}}>Excel in your courses using our latest set of study resources.</h1>
                                    
                                        <div className={styles.hometoabout}></div>
                                            <div style={{ marginTop:'900px', height:'80vh', display:'flex', flexDirection:'row'}}>
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
                                                        Preapare yourself for the day of the test.
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
