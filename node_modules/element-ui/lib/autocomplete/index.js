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

	module.exports = __webpack_require__(5);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ElAutocomplete = __webpack_require__(6);

	ElAutocomplete.install = function (Vue) {
	  Vue.component(ElAutocomplete.name, ElAutocomplete);
	};

	module.exports = ElAutocomplete;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* script */
	__vue_exports__ = __webpack_require__(7)

	/* template */
	var __vue_template__ = __webpack_require__(10)
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _index = __webpack_require__(8);

	var _index2 = _interopRequireDefault(_index);

	var _clickoutside = __webpack_require__(9);

	var _clickoutside2 = _interopRequireDefault(_clickoutside);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'ElAutocomplete',

	  components: {
	    ElInput: _index2.default
	  },
	  directives: { Clickoutside: _clickoutside2.default },
	  props: {
	    placeholder: String,
	    disabled: Boolean,
	    name: String,
	    value: String,
	    fetchSuggestions: Function,
	    triggerOnFocus: {
	      type: Boolean,
	      default: true
	    },
	    customItem: String
	  },
	  data: function data() {
	    return {
	      suggestions: [],
	      suggestionVisible: false,
	      loading: false,
	      highlightedIndex: -1
	    };
	  },

	  methods: {
	    handleChange: function handleChange(value) {
	      this.$emit('input', value);
	      this.showSuggestions(value);
	    },
	    handleFocus: function handleFocus() {
	      if (this.triggerOnFocus) {
	        this.showSuggestions(this.value);
	      }
	    },
	    handleBlur: function handleBlur() {
	      this.hideSuggestions();
	    },
	    select: function select(index) {
	      var _this = this;

	      if (this.suggestions && this.suggestions[index]) {
	        this.$emit('input', this.suggestions[index].value);
	        this.$emit('select', this.suggestions[index]);
	        this.$nextTick(function () {
	          _this.hideSuggestions();
	        });
	      }
	    },
	    hideSuggestions: function hideSuggestions() {
	      this.suggestionVisible = false;
	      this.suggestions = [];
	      this.loading = false;
	    },
	    showSuggestions: function showSuggestions(value) {
	      var _this2 = this;

	      this.suggestionVisible = true;
	      this.loading = true;
	      this.fetchSuggestions(value, function (suggestions) {
	        _this2.loading = false;
	        if (Array.isArray(suggestions) && suggestions.length > 0) {
	          _this2.suggestions = suggestions;
	        } else {
	          _this2.hideSuggestions();
	        }
	      });
	    },
	    highlight: function highlight(index) {
	      if (!this.suggestionVisible || this.loading) {
	        return;
	      }
	      if (index < 0) {
	        index = 0;
	      } else if (index >= this.suggestions.length) {
	        index = this.suggestions.length - 1;
	      }

	      var elSuggestions = this.$refs.suggestions;
	      var elSelect = elSuggestions.children[index];
	      var scrollTop = elSuggestions.scrollTop;
	      var offsetTop = elSelect.offsetTop;

	      if (offsetTop + elSelect.scrollHeight > scrollTop + elSuggestions.clientHeight) {
	        elSuggestions.scrollTop += elSelect.scrollHeight;
	      }
	      if (offsetTop < scrollTop) {
	        elSuggestions.scrollTop -= elSelect.scrollHeight;
	      }

	      this.highlightedIndex = index;
	    }
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("element-ui/lib/input");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("element-ui/lib/utils/clickoutside");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    directives: [{
	      name: "clickoutside",
	      value: (handleBlur),
	      expression: "handleBlur"
	    }],
	    staticClass: "el-autocomplete"
	  }, [_h('el-input', {
	    attrs: {
	      "disabled": disabled,
	      "placeholder": placeholder,
	      "name": name
	    },
	    domProps: {
	      "value": value
	    },
	    on: {
	      "onchange": handleChange,
	      "onfocus": handleFocus
	    },
	    nativeOn: {
	      "keydown": [function($event) {
	        if ($event.keyCode !== 38) return;
	        highlight(highlightedIndex - 1)
	      }, function($event) {
	        if ($event.keyCode !== 40) return;
	        highlight(highlightedIndex + 1)
	      }, function($event) {
	        if ($event.keyCode !== 13) return;
	        select(highlightedIndex)
	      }]
	    }
	  }), " ", _h('transition', {
	    attrs: {
	      "name": "md-fade-bottom"
	    }
	  }, [(suggestionVisible) ? _h('ul', {
	    ref: "suggestions",
	    staticClass: "el-autocomplete__suggestions",
	    class: {
	      'is-loading': loading
	    }
	  }, [(loading) ? _h('li', [_m(0)]) : _l((suggestions), function(item, index) {
	    return [(!customItem) ? _h('li', {
	      class: {
	        'highlighted': highlightedIndex === index
	      },
	      on: {
	        "click": function($event) {
	          select(index)
	        }
	      }
	    }, ["\n          " + _s(item.value) + "\n        "]) : _h(customItem, {
	      tag: "component",
	      class: {
	        'highlighted': highlightedIndex === index
	      },
	      attrs: {
	        "item": item,
	        "index": index
	      },
	      on: {
	        "click": function($event) {
	          select(index)
	        }
	      }
	    }), " "]
	  }), " "]) : _e()])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('i', {
	    staticClass: "el-icon-loading"
	  })
	}}]}

/***/ }
/******/ ]);