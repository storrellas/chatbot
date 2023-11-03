import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const render = (container) => {
  var iDiv = document.createElement('div');
  iDiv.id = 'apid';
  iDiv.className = 'apid';
  document.getElementsByTagName('body')[0].appendChild(iDiv);

  const root = ReactDOM.createRoot(document.querySelector('#apid'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();  
} 
window.render = render
