import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: {
            id: localStorage.id || "",
            loginname: localStorage.loginname || "",
            avatar: localStorage.avatar || "",
            accesstoken: localStorage.accesstoken || "",
            score: localStorage.score || null,
            message: localStorage.message || null
        },
        loading: false
    },
    getters: {
        getUserInfo: state => {
            return state.user || {};
        },
        getLoading: state => {
            return state.loading;
        }
    },
    mutations: {
        setUserInfo: (state, user) => {
            state.user = Object.assign({}, state.user, user);
        },
        clearUserInfo: state => {
            state.user = {
                id: "",
                loginname: "",
                avatar: "",
                accesstoken: "",
                score: null,
                message: null
            }
        },
        setValue: (state, obj) => {
            console.log(obj.key + "---" + obj.value);
            if (obj && obj.key) {
                state.user[obj.key] = obj.value;
            }
            console.log(obj.value);
            console.log(state.user[obj.key]);
        },
        setLoading: (state, loading) => {
            state.loading = loading;
        }
    },
    actions: {
        setUserInfo: ({
            commit
        }, user) => {
            return new Promise(function(resolve, reject) {
                commit("setUserInfo", user);
                resolve();
            });
        },
        clearUserInfo: ({
            commit
        }) => {
            return new Promise(function(resolve, reject) {
                commit("clearUserInfo");
                resolve();
            });
        },
    }
});

export default store;
