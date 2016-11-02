import Vue from "vue";
import VueRouter from 'vue-router';

Vue.use(VueRouter);

//require.ensure是webpack用来代码分割的，可以按需加载
//其实resolve就已经是懒加载了，这样写只是为了运用code spliting
const newtopic = resolve => {
    require.ensure(["../pages/newtopic.vue"], () => {
        resolve(require("../pages/newtopic.vue"));
    })
};

const routes = () => {
    return [{
        path: "/",
        redirect: {
            name: "index",
            query: {
                tab: "all"
            }
        },
    }, {
        path: "/index",
        name: 'index',
        //resolve加载组件方式为异步组件，组件需要渲染的时候触发工厂函数，并把结果缓存起来，用于再次渲染
        component: (resolve) => {
            require(["../pages/index.vue"], resolve);
        },
        alias: "/?tab=all",
    }, {
        path: "/api",
        name: "api",
        component: (resolve) => {
            require(["../pages/api.vue"], resolve);
        }
    }, {
        path: "/about",
        name: "about",
        component: (resolve) => {
            require(["../pages/about.vue"], resolve);
        }
    }, {
        path: "/login",
        name: "login",
        component: (resolve) => {
            require(["../pages/login.vue"], resolve);
        }
    }, {
        path: "/user/:name",
        name: "user",
        component: (resolve) => {
            require(["../pages/user.vue"], resolve);
        }
    }, {
        path: "/topic/:id",
        name: "topic",
        component: (resolve) => {
            require(["../pages/topic.vue"], resolve);
        }
    }, {
        path: "/message",
        name: "message",
        component: (resolve) => {
            require(["../pages/message.vue"], resolve);
        },
        meta: {
            requiresAuth: true
        }
    }, {
        path: "/newtopic",
        name: "newtopic",
        component: newtopic,
        meta: {
            requiresAuth: true
        }
    }, {
        path: "/edittopic/:id",
        name: "edittopic",
        component: newtopic,
        meta: {
            requiresAuth: true
        }
    }];
};


export default new VueRouter({
    mode: "hash",
    base: __dirname,
    routes: routes()
});
