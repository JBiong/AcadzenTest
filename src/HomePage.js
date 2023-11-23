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
                    <Route path='/learningsession' element={<LearningSession />} />
                    <Route path='/uploaddocument' element={<UploadDocument />} />
                    <Route path='/aboutus' element={<AboutUs />} />
                    <Route path='/aboutacadzen' element={<AboutAcadZen />} />
                    <Route path="/login" element={<Login isSignInView={isSignInView} setIsSignInView={setIsSignInView} />} />
                    <Route path="/signup" element={<Signup handleToggle={() => setShowLogin(false)} />} />
                    <Route
                        path="/"
                        element={
                            <Box sx={{ flexGrow: 1 }}>
                                {!hideAppBar && (
                                    <AppBar position="fixed" style={{ backgroundColor: '#FFFFFF' }}>
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
                                        <div style={{backgroundColor:'#FFFFFF'}}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor:'#FFFFFF', height:'250px' }}>
                                                {/* Column 1 */}
                                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                    <h1>About</h1>
                                                    <Link to="/aboutus"><Button style={{color:'#000000', textDecoration: 'none', ':hover': { textDecoration: 'underline' } }}>About us</Button></Link>
                                                    <Link to="/aboutacadzen"><Button style={{color:'#000000', textDecoration: 'none', ':hover': { textDecoration: 'underline' } }}>About Acadzen</Button></Link>
                                                    <Button style={{color:'#000000', textDecoration: 'none', ':hover': { textDecoration: 'underline' } }}>Get the app</Button>
                                                </div>

                                                {/* Column 2 */}
                                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                    <h1>For Students</h1>
                                                    <Button style={{color:'#000000', textDecoration: 'none', ':hover': { textDecoration: 'underline' } }}>Flashcards</Button>
                                                    <Button style={{color:'#000000', textDecoration: 'none', ':hover': { textDecoration: 'underline' } }}>Quiz</Button>
                                                    <Button style={{color:'#000000', textDecoration: 'none', ':hover': { textDecoration: 'underline' } }}>Learn</Button>
                                                </div>

                                                {/* Column 3 */}
                                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                    <h1>Resources</h1>
                                                    <Button style={{color:'#000000', textDecoration: 'none', ':hover': { textDecoration: 'underline' } }}>Terms</Button>
                                                    <Button style={{color:'#000000', textDecoration: 'none', ':hover': { textDecoration: 'underline' } }}>Guidelines</Button>
                                                    <Button style={{color:'#000000', textDecoration: 'none', ':hover': { textDecoration: 'underline' } }}>Honor Code</Button>
                                                </div>
                                            </div>
                                            <hr style={{ border: 'none', borderBottom: '1px solid grey', margin: '50px', marginTop:'25px' }} />
                                            <div style={{backgroundColor:'#FFFFFF', marginTop:'50px', height:'350px'}}>
                                                    <IconButton>
                                                        <img
                                                            src="insta.png"
                                                            alt="insta"
                                                            style={{
                                                                width: '60px', margin:'20px'
                                                            }}
                                                        />
                                                    </IconButton>
                                                    <IconButton>
                                                        <img
                                                            src="facebook.png"
                                                            alt="fb"
                                                            style={{
                                                                width: '60px', margin:'20px'
                                                            }}
                                                        />
                                                    </IconButton>
                                                    <IconButton>
                                                        <img
                                                            src="twitter.png"
                                                            alt="X"
                                                            style={{
                                                                width: '60px', margin:'20px'
                                                            }}
                                                        />
                                                    </IconButton>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor:'#FFFFFF', height:'75px', width:'1000px', marginLeft:'450px' }}>
                                                            {/* Column 1 */}
                                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                                <p>Privacy Policy</p>
                                                            </div>
                                                            <Box sx={{ marginTop: '15px', color: '#8C7111' }}>|</Box>
                                                            {/* Column 2 */}
                                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                                <p>Cookie Policy</p>
                                                            </div>
                                                            <Box sx={{ marginTop: '15px', color: '#8C7111' }}>|</Box>
                                                            {/* Column 3 */}
                                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                                <p>Legal Notice</p>
                                                            </div>
                                                            <Box sx={{ marginTop: '15px', color: '#8C7111' }}>|</Box>
                                                            {/* Column 4 */}
                                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                                <p>Accessibility Policy</p>
                                                            </div>
                                                            <Box sx={{ marginTop: '15px', color: '#8C7111' }}>|</Box>
                                                            {/* Column 4 */}
                                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                                <p>Cookie Settings</p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p style={{fontWeight:'bold'}}> 🌐︎ Philippine - English</p>
                                                            <p>© 2023 Acadzen Inc.</p>
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
