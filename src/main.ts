import Vue from 'vue';
import App from './App.vue';
import './styles/_var.scss';
import uui from './packages/index';

Vue.use(uui);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
