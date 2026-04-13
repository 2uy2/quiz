import axios from "axios"; 

import NProgress from "nprogress";
import {store} from "../redux/store"

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
    const access_token = store?.getState()?.user?.account?.access_token; //lấy accesstoken từ redux
    config.headers["Authorization"] = `Bearer ${access_token}`; // rồi gắn vào config (trong postman ta sẽ thấy phần Authorization ở dạng Bearer Token khi ta test API )
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
    //token refreshe

    NProgress.done();
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error\
    // console.log(">>>run error",error.response);
    return error&&error.response &&error.response.data ? error.response.data: Promise.reject(error);
  },
);

export default instance;