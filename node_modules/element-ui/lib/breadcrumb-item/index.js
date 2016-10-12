module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(19);


/***/ },

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ElBreadcrumbItem = __webpack_require__(20);

	ElBreadcrumbItem.install = function (Vue) {
	  Vue.component(ElBreadcrumbItem.name, ElBreadcrumbItem);
	};

	module.exports = ElBreadcrumbItem;

/***/ },

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* script */
	__vue_exports__ = __webpack_require__(21)

	/* template */
	var __vue_template__ = __webpack_require__(22)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ },

/***/ 21:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.default = {
	  name: 'ElBreadcrumbItem',
	  data: function data() {
	    return {
	      separator: ''
	    };
	  },
	  mounted: function mounted() {
	    this.separator = this.$parent.separator;
	  }
	};

/***/ },

/***/ 22:
/***/ function(module, exports) {

	module.exports={render:function (){with(this) {
	  return _h('span', {
	    staticClass: "el-breadcrumb__item"
	  }, [_h('span', {
	    staticClass: "el-breadcrumb__item__text"
	  }, [_t("default")]), _h('span', {
	    staticClass: "el-breadcrumb__separator"
	  }, [_s(separator)])])
	}},staticRenderFns: []}

/***/ }

/******/ });