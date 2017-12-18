import App from './app.vue'
import store from './utils/store.js' // store暂时没用到

// // 生产环境下去注释
// Vue.config.productionTip = false;

new Vue({
    el: '#app',
    store,
    template: '<App/>',
    components: { App }
})
