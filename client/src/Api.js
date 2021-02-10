
import Axios from 'axios'
import Cookie from 'js-cookie'

const baseUrl = "http://localhost:8080/api"

Axios.interceptors.request.use(
    (config) => {
      const accessToken = Cookie.get("accessToken");
      
      if (accessToken) {
        config.headers["authorization"] ='bearer'+ accessToken;
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
      console.log(error.response)
  if (
        refreshToken &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        return Axios
          .post(`${baseUrl}/auth/token`, { refreshToken: refreshToken })
          .then((res) => {
            console.log(res.data)
            if (res.data.status === 'success') {
              Cookie.set("accessToken", res.data.newToken);
              Cookie.remove("refreshToken")
              console.log("Access token refreshed!");
              return Axios(originalRequest);
            }
          }).catch(err=>{
            console.log(err.message)
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
//     getUserInfo: () => {
//       return Axios.get(`${baseUrl}/user/data`);
//     },
//   };

  export default Axios