// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import {routes} from './routes';
import {store} from './store/store';

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
  routes:routes,
  mode:"history",
  scrollBehavior(to,from,savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    else if(to.path == '/Home'){
      console.log(savedPosition)
      return {x: 0, y: 100}
    }
    else{
      return {x: 0, y: 0}
    }
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
