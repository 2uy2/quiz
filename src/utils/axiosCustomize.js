import axios from "axios"; 
import { each } from "lodash";
import NProgress from "nprogress";

//customize loading bar
NProgress.configure({
  showSpinner:false,
  easing:"ease",
  speed:500,
  trickleSpeed:100
})
//end customize loading bar

const instance = axios.create({
  baseURL: "http://localhost:8081/",
  
});


// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    NProgress.start();
     
    // Do something before the request is sent
    return config;
  },
  function (error) {
    // Do something with the request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    NProgress.done();
    // Any status code that lies within the range of 2xx causes this function to trigger
    // Do something with response data
    return response&&response.data ? response.data:response;
  },
  function (error) {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error\
    // console.log(">>>run error",error.response);
    return error&&error.response &&error.response.data ? error.response.data: Promise.reject(error);
  },
);

export default instance;