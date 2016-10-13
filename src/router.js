"use strict";

export default () => {
  return [
    {
      path: "/",
      name: 'index',
      component: (resolve) => {
        require(["./pages/index.vue"], resolve);
      }
    },
    {
      path: "/api",
      name: "api",
      component: (resolve) => {
        require(["./pages/api.vue"], resolve);
      }
    },
    {
      path: "/about",
      name: "about",
      component: (resolve) => {
        require(["./pages/about.vue"], resolve);
      }
    },
    {
      path: "/login",
      name: "login",
      component: (resolve) => {
        require(["./pages/login.vue"], resolve);
      }
    },
    {
      path: "/user/:id",
      name: "user",
      component: (resolve) => {
        require(["./pages/user.vue"], resolve);
      }
    },
    {
      path: "/topic/:id",
      name: "topic",
      component: (resolve) => {
        require(["./pages/topic.vue"], resolve);
      }
    }
  ];
};
