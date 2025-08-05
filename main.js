import App from './App'
import Vue from 'vue'
import './uni.promisify.adaptor'
import uView from '@/uni_modules/uview-ui'
import Utils from '@/common/utils/prototype-method.js'
import share from '@/common/utils/share.js';
Vue.use(uView)
Vue.mixin(share)
Utils.init(Vue)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()