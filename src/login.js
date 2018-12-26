import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource)
import App from './pages/login.vue'
import dataService from './dataService';

Vue.prototype.dataService = dataService;

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
})