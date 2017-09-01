import Vue from 'vue'
import App from './app.vue'
import store from './store'
import 'font-awesome/css/font-awesome.css'
// 挂载提示线
import './entries/window-runtime'
// import './assets/css/minimap.min.css'
const app = new Vue({
  store,
  ...App
})

app.$mount('#app')
