import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-grid-layout/css/styles.css';

import Dashboard from '../src/components/dashboard';

import reportWebVitals from './reportWebVitals';




const data = {
  Status: 200,
  Message: 'Successfully Access',
  Report: {
    DailySale: -240000,
    MonthlySale: -240000,
    AnnualySale: -2341529.108099999837577342987060546875,
    // Add other properties from the "Report" object...
  },
  Currency: 'United Arab Emirates dirham - AED',
  Profit: {
    DailyProfit: 3227187.8209545738063752651214599609375,
    MonthlyProfit: 3227187.8209545738063752651214599609375,
    AnnualyProfit: -4950282.5315454266965389251708984375,
    // Add other properties from the "Profit" object...
  },
  Token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...',
};



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Dashboard data={ data } />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
