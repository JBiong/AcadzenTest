import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
// import Login from './Login';
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import UploadDocument from './UploadDocument';
<<<<<<< HEAD
import LearningSession from './LearningSession';
=======
import AboutAcadZen from './AboutAcadZen';
import AboutUs from './AboutUs';
>>>>>>> b1b8a4e45e8705ea1351b9a739cbb099211ee46b

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <HomePage/> */}
    {/* <Dashboard/> */}
    {/* <UploadDocument/> */}
<<<<<<< HEAD
    {/* <LearningSession/> */}
=======
    {/* <AboutAcadZen/> */}
    <AboutUs/>
>>>>>>> b1b8a4e45e8705ea1351b9a739cbb099211ee46b
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
