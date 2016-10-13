"use strict";

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import element from "element-ui";
import "element-ui/lib/theme-default/index.css";
import routes from "./router.js";
import filters from "./filters.js";

Vue.config.devtools = true;
Vue.use(VueRouter);
Vue.use(element);

Object.keys(filters).forEach((v, i) => {
  Vue.filter(v, filters[v]);
});

const router = new VueRouter({
  mode: "hash",
  base: __dirname,
  routes: routes()
});

new Vue({
  router: router,
  render: h => h(App)
}).$mount("#app");
