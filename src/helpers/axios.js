import axios from "axios";
import refreshInterceptor from "axios-auth-refresh";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_LOGIN_URL}`,
  withCredentials: false, // Ensure cookies are sent with requests
  crossdomain: true,
});

// Function to refresh authentication token
// const refreshAuthLogic = (failedRequest) => {
//   return axios.post(`${process.env.REACT_APP_LOGIN_URL}/refresh-token`, {
//     jwt_refresh: localStorage.getItem("jwtRefresh"),
//   })
//     .then((tokenRefreshResponse) => {
//       // Update tokens in local storage
//       localStorage.setItem("jwt", tokenRefreshResponse.data.jwt);
//       localStorage.setItem("jwtRefresh", tokenRefreshResponse.data.jwtRefresh);
//
//       // Retry the original request
//       failedRequest.response.config.headers['AUTH_JWT'] = tokenRefreshResponse.data.jwt;
//       return Promise.resolve();
//     })
//     .catch((error) => {
//       // Handle refresh token failure
//       console.error("Token refresh failed:", error);
//       // You might want to handle this differently, e.g., show an error message to the user
//       return Promise.reject(error);
//     });
// };

// Add a request interceptor to update JWT token before each request
instance.interceptors.request.use(config => {
  config.headers['AUTH_JWT'] = localStorage.getItem("jwt");
  config.headers['AUTH_JWT_REFRESH'] = localStorage.getItem("jwtRefresh");
  return config;
});

// refreshInterceptor(instance, refreshAuthLogic);
// Add response interceptor to handle 401 errors and refresh token
// refreshInterceptor(instance, refreshAuthLogic);

export default instance;
