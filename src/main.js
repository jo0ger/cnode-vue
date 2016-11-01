"use strict";

import Vue from 'vue';
import App from './App.vue';
import element from "element-ui";
import "element-ui/lib/theme-default/index.css";
import filter from "./filter";
import router from "./router";
import store from "./store";

Vue.config.devtools = true;
Object.keys(filter).forEach((v, i) => {
    Vue.filter(v, filters[v]);
});

Vue.use(element);

const app = new Vue({
    router,
    store,
    render: h => h(App)
});

export {app, router, store};
