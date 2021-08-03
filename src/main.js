import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router.js'
import store from './store'
import packageInfo from '../package.json'

Vue.config.productionTip = false
Vue.prototype.$info = {
  packageInfo: packageInfo,
}

Vue.prototype.setLocalStorageArray = (key, arr) =>
  localStorage.setItem(key, JSON.stringify(arr));
Vue.prototype.getLocalStorageArray = (key) => { const value = localStorage.getItem(key); return value ? JSON.parse(value) : [] }
Vue.prototype.delLocalStorageItem = (key) => localStorage.removeItem(key)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
