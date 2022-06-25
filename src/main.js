import Vue from 'vue';
import App from './App.vue';
// 按需引入
// import '../plugins/element.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from '@/api/index.js';
import router from '@/router';
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;
Vue.use(ElementUI)
Vue.config.productionTip = false;
new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app');
