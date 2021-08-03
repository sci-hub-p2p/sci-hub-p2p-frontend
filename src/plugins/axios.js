"use strict";

import Vue from 'vue';
import axios from "axios";
import store from '../store';

const snackbar = (msg, color = 'primary') => store
  .dispatch("snackbar/openSnackbar", {
    msg: msg,
    color: color,
  });

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: process.env.NODE_ENV == 'production' ? '/api/v0' : "http://127.0.0.1:2333/api/v0"
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (response) {
    console.log('[Axios Request Success]', response);
    return response;
  },
  function (error) {
    console.log('[Axios Request Error]', error.toJSON());
    snackbar(error, 'error');
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    console.log('[Axios Response Success]', response);
    return response;
  },
  function (error) {
    console.log('[Axios Response Error]', error);
    snackbar(error, 'error');
    return Promise.reject(error);
  }
);

//lugin.install = function (Vue, options) {
Plugin.install = function (Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.prototype.$axios = axios
Vue.use(Plugin)

export default Plugin;
