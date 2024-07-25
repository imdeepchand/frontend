import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import axios from 'axios';
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if(token) {
      config.headers['Authorization'] = token;
    }
    return config;
  }
)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
