'use client'
import axios from 'axios';

// import { store } from './state/AuthStore';
// const https = require('https');

// At request level
// let agent;
// if (typeof window === 'undefined') {
//     // Виконувати тільки на сервері
//     const https = require('https');
//     agent = new https.Agent({
//         rejectUnauthorized: false
//     });
// }
let store

export const injectStore = (_store) => {
   store = _store;
};

 export const getAuthToken = () => {
   return store.getState().auth.accessToken;
 };

const apiLogin = axios.create({
   baseURL: 'https://demo-api.apiko.academy',
   headers: { 'Content-Type': 'application/json' }
});


// Add an interceptor for all requests
apiLogin.interceptors.request.use(function (config) {
   // Do something before the request is sent
   // For example, add an authentication token to the headers
   
   const accessToken = store.getState().auth.accessToken;

   if (accessToken) {
     config.headers.Authorization = `Bearer ${accessToken}`;
   }
   return config;
 },
 function (error) {
   // Handle the error
   return Promise.reject(error);
 });

export default apiLogin;