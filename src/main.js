"use strict";

import Vue from 'vue';
import App from './App.vue';
import element from "element-ui";
import "element-ui/lib/theme-default/index.css";
import filters from "./filters.js";
import router from "./router";
import store from "./store";

Vue.use(element);

Vue.config.devtools = true;

Object.keys(filters).forEach((v, i) => {
    Vue.filter(v, filters[v]);
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
