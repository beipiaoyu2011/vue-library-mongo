import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource)
import App from './pages/register.vue'
import dataService from './dataService';
import router from "./router";

Vue.prototype.dataService = dataService;

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
})