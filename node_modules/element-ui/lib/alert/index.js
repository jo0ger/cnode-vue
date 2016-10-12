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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Alert = __webpack_require__(2);

	Alert.install = function (Vue) {
	  Vue.component(Alert.name, Alert);
	};

	module.exports = Alert;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* script */
	__vue_exports__ = __webpack_require__(3)

	/* template */
	var __vue_template__ = __webpack_require__(4)
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
/* 3 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;


	var TYPE_CLASSES_MAP = {
	  'success': 'el-icon-circle-check',
	  'warning': 'el-icon-warning',
	  'error': 'el-icon-circle-cross'
	};
	exports.default = {
	  name: 'el-alert',

	  props: {
	    title: {
	      type: String,
	      default: '',
	      required: true
	    },
	    description: {
	      type: String,
	      default: ''
	    },
	    type: {
	      type: String,
	      default: 'info'
	    },
	    closable: {
	      type: Boolean,
	      default: true
	    },
	    closeText: {
	      type: String,
	      default: ''
	    },
	    showIcon: {
	      type: Boolean,
	      default: false
	    }
	  },

	  data: function data() {
	    return {
	      visible: true
	    };
	  },


	  methods: {
	    close: function close() {
	      this.visible = false;
	      this.$emit('close');
	    }
	  },

	  computed: {
	    typeClass: function typeClass() {
	      return 'el-alert--' + this.type;
	    },
	    iconClass: function iconClass() {
	      return TYPE_CLASSES_MAP[this.type] || 'el-icon-information';
	    },
	    isBigIcon: function isBigIcon() {
	      return this.description ? 'is-big' : '';
	    },
	    isBoldTitle: function isBoldTitle() {
	      return this.description ? 'is-bold' : '';
	    }
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports={render:function (){with(this) {
	  return _h('transition', {
	    attrs: {
	      "name": "el-alert-fade"
	    }
	  }, [_h('div', {
	    directives: [{
	      name: "show",
	      value: (visible),
	      expression: "visible"
	    }],
	    staticClass: "el-alert",
	    class: [typeClass]
	  }, [(showIcon) ? _h('i', {
	    staticClass: "el-alert__icon",
	    class: [iconClass, isBigIcon]
	  }) : _e(), " ", _h('div', {
	    staticClass: "el-alert__content"
	  }, [(title) ? _h('span', {
	    staticClass: "el-alert__title",
	    class: [isBoldTitle]
	  }, [_s(title)]) : _e(), " ", (description) ? _h('p', {
	    staticClass: "el-alert__description"
	  }, [_s(description)]) : _e(), " ", _h('i', {
	    directives: [{
	      name: "show",
	      value: (closable),
	      expression: "closable"
	    }],
	    staticClass: "el-alert__closebtn",
	    class: {
	      'is-customed': closeText !== '', 'el-icon-close': closeText === ''
	    },
	    on: {
	      "click": function($event) {
	        close()
	      }
	    }
	  }, [_s(closeText)])])])])
	}},staticRenderFns: []}

/***/ }
/******/ ]);