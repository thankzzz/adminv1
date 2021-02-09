
import Axios from 'axios'
import Cookie from 'js-cookie'

const baseUrl = "http://localhost:8080/api"

Axios.interceptors.request.use(
    (config) => {
      const accessToken = Cookie.get("accessToken");
      
      if (accessToken) {
        config.headers["x-auth-token"] ='bearer'+ accessToken;
      }
      return config;
    },
    (error) => {
      
      Promise.reject(error);
    }
  );
  //response interceptor to refresh token on receiving token expired error
  Axios.interceptors.response.use(
    (response) => {
     
      return response;
    },
    function (error) {
     
      const originalRequest = error.config;
      let refreshToken = Cookie.get("refreshToken");
    
  if (
        refreshToken
      ) {
       
        originalRequest._retry = true;
        return Axios
          .post(`${baseUrl}/auth/token`, { refreshToken: refreshToken })
          .then((res) => {
            if (res.status === 200) {
              Cookie.set("accessToken", res.data.accessToken);
              console.log("Access token refreshed!");
              return Axios(originalRequest);
            }
          });
      }
     
      return Promise.reject(error);
    }
  );

// const api = {
//     signup: (body) => {
//       return Axios.post(`${baseUrl}/signup`, body);
//     },
//     login: (body) => {
//       return Axios.post(`${baseUrl}/account/signin`,body);
//     },
//     logout: (body) => {
//       return Axios.delete(`${baseUrl}/account/signout`, body);
//     },
//     getUserAgent: () => {
//       return Axios.get(`${baseUrl}/user/agent/`);
//     },
//   };

  export default Axios