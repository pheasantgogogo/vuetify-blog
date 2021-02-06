import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/router'
// import highlight from './plugins/highlight'
import './styles/global.sass'
import Notify from 'vue-notifyjs'
import "vue-notifyjs/themes/default.css"
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
Vue.component('v-charts', ECharts)

Vue.use(Notify, {
  horizontalAlign: 'center',
  verticalAlign: 'bottom'
})

Vue.config.productionTip = false
// Vue.use(highlight)
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
