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
import QuizSession from './QuizSession';
import AboutAcadZen from './AboutAcadZen';
import AboutUs from './AboutUs';
<<<<<<< HEAD
import FlashcardProgress from './FlashcardProgress';
import FlashcardManagement from './FlashcardManagement';
=======

import FlashcardManagement from './FlashcardManagement';
import { BrowserRouter } from 'react-router-dom';

import FlashcardProgress from './FlashcardProgress';
import Pricing from './Pricing';
// import FlashcardManagement from './FlashcardManagement';

>>>>>>> 67352a2fb88ecb7e77945f05911bddd0e7d57aed


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    {/* <App /> */}
    {/* <HomePage/> */}
    <QuizSession/>
    {/* <Dashboard/> */}
    {/* <UploadDocument/> */}
    {/* <FlashcardProgress/> */}
<<<<<<< HEAD
    {/* <FlashcardManagement/> */}
=======
>>>>>>> 67352a2fb88ecb7e77945f05911bddd0e7d57aed
    {/* <LearningSession/> */}
    {/* <AboutAcadZen/> */}
    {/* <AboutUs/> */}
    {/* <Pricing/> */}
    {/* </BrowserRouter> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
