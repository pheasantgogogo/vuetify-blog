import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/router'
import highlight from './plugins/highlight'

Vue.config.productionTip = false
Vue.use(highlight)
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
