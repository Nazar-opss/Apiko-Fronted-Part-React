import axios from 'axios';

let store

export const injectStore = (_store) => {
   store = _store;
};

const apiUser = axios.create({
   baseURL: 'https://demo-api.apiko.academy',
   headers: { 'Content-Type': 'application/json' }
});


// Add an interceptor for all requests
apiUser.interceptors.request.use(function (config) {
   // Do something before the request is sent
   // For example, add an authentication token to the headers
   
   const accessToken = store.getState().auth.accessToken;

   if (accessToken) {
     config.headers.Authorization = `Bearer ${accessToken}`;
   }
   return config;
  },
 );

export default apiUser;