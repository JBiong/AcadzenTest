import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
// import Login from './Login';
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import UploadDocument from './UploadDocument';
import LearningSession from './LearningSession';
import AboutAcadZen from './AboutAcadZen';
import AboutUs from './AboutUs';
<<<<<<< Updated upstream
import FlashcardManagement from './FlashcardManagement';
import { BrowserRouter } from 'react-router-dom';
=======
import FlashcardProgress from './FlashcardProgress';
import FlashcardManagement from './FlashcardManagement';
>>>>>>> Stashed changes


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    {/* <App /> */}
    <HomePage/>
    {/* <Dashboard/> */}
    {/* <UploadDocument/> */}
<<<<<<< Updated upstream
    {/* <FlashcardManagement/> */}
    {/* <LearningSession/> */}
=======
    {/* <FlashcardProgress/> */}
    {/* <FlashcardManagement/> */}
    <LearningSession/>
>>>>>>> Stashed changes
    {/* <AboutAcadZen/> */}
    {/* <AboutUs/> */}
    {/* </BrowserRouter> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
