import './index.css';
import App from './App';
import axios from "axios";
import React from 'react';
import store from "./redux/store";
import { Provider } from "react-redux";
import ReactDOM from 'react-dom/client';
import { setDataUser } from "./redux/actions";
import { BrowserRouter } from 'react-router-dom';
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

(function(){
  axios.interceptors.response.use(function(response){
    return response;
  }, function(error){
    const status = error.status || error.response.status || error.response.request.status;

    if(status === 401)
      if(error.response.data.error === 'Token fail'){
        if(localStorage.getItem('auth')) localStorage.removeItem('auth');
        store.dispatch(setDataUser({}));
      }

      return Promise.reject(error);
  })
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
