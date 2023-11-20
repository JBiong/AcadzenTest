// Dashboard.js
import React from "react";
import { Toolbar, Typography } from "@mui/material";
import "./login.css"; // Import your styles file

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="navcontainer">
        <div className="dashboardlogo">
          <Toolbar>
            <img
              src="logo.png"
              alt="AcadZen Logo"
              style={{ width: '80px' }}
            />
            <Typography style={{ fontWeight: 'bold', color: '#8C7111', fontSize: '40px' }}>AcadZen</Typography>
          </Toolbar>
        </div>
      </div>
      <div className="namecontainer">
        <Toolbar style={{ margin: '10px' }}>
          <img
            src="prof.png"
            alt="AcadZen profile"
            style={{ width: '70px' }}
          />
          <div style={{ marginLeft: '20px' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
              Welcome Back,
            </Typography>
            <Typography variant="h3" style={{ fontWeight: 'bold' }}>
              James Bond!
            </Typography>
          </div>
        </Toolbar>
        <div className="quizact">
          <h3>Recent Quiz Activity</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
