"use strict";

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import element from "element-ui";
import "element-ui/lib/theme-default/index.css";
import routes from "./router.js";

Vue.use(VueRouter);
Vue.use(element);

new Vue({
  render: h => h(App)
}).$mount("#app");
