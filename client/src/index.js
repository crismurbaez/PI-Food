import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './redux/store'
//NUEVO CÓDIGO PARA HACER EL DEPLOY////////////////////////////////////////////////////////
import axios from 'axios'
import dotenv from 'dotenv';
dotenv.config();
//AL AGREGAR ESTA LÍNEA SE ELIMINAN DE LAS ACCIONES DE REDUX ESTA PARTE DE LA DIRECCIÓN
axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';
//////////////////////////////////////////////////////////////////////////////////////////
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
