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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <HomePage/>
    {/* <Dashboard/> */}
    {/* <UploadDocument/> */}
    {/* <LearningSession/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
