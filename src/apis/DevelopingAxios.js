import axios from 'axios';

var DevelopingAxios = axios.create({
  baseURL: 'http://localhost:8080/api',
  /* other custom settings */
});

DevelopingAxios.interceptors.request.use(
  function dodajJWT(config){
    const jwt = window.localStorage['jwt'];
    if(jwt){
      config.headers['Authorization']='Bearer ' + jwt;
    }
    return config;
  }
)

export default DevelopingAxios;
