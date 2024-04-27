import axios from "axios";
import refreshInterceptor from "axios-auth-refresh";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_LOGIN_URL}`,
  withCredentials: false, 
  crossdomain: true,
});

instance.interceptors.request.use(config => {
  config.headers['AUTH_JWT'] = localStorage.getItem("jwt");
  config.headers['AUTH_JWT_REFRESH'] = localStorage.getItem("jwtRefresh");
  return config;
});

export default instance;
