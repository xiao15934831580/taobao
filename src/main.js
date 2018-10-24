// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from '../node_modules/jquery/dist/jquery'

import {Toast,Loading} from 'wc-messagebox'
import 'wc-messagebox/style.css'
Vue.use(Toast, {})
Vue.use(Loading, {})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  Toast,
  Loading,
  render: function (createElement) {
    return createElement(App)
  }
})
