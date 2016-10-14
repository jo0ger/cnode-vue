'use strict';

exports.__esModule = true;

var _popper = require('./popper');

var _popper2 = _interopRequireDefault(_popper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {HTMLElement} [reference=$refs.reference] - The reference element used to position the popper.
 * @param {HTMLElement} [popper=$refs.popper] - The HTML element used as popper, or a configuration used to generate the popper.
 * @param {String} [placement=button] - Placement of the popper accepted values: top(-start, -end), right(-start, -end), bottom(-start, -right), left(-start, -end)
 * @param {Number} [offset=0] - Amount of pixels the popper will be shifted (can be negative).
 * @param {Boolean} [visible=false] Visibility of the popup element.
 * @param {Boolean} [visible-arrow=false] Visibility of the arrow, no style.
 */
exports.default = {
  props: {
    placement: {
      type: String,
      default: 'bottom'
    },
    boundariesPadding: {
      type: Number,
      default: 5
    },
    reference: Object,
    popper: Object,
    offset: {
      default: 0
    },
    value: Boolean,
    visibleArrow: Boolean,
    transition: String,
    options: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },

  data: function data() {
    return {
      showPopper: false
    };
  },


  watch: {
    value: {
      immediate: true,
      handler: function handler(val) {
        this.showPopper = val;
        this.$emit('input', val);
      }
    },

    showPopper: function showPopper(val) {
      val ? this.updatePopper() : this.destroyPopper();
      this.$emit('input', val);
    }
  },

  methods: {
    createPopper: function createPopper() {
      var _this = this;

      if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.placement)) {
        return;
      }

      var options = this.options;
      var popper = this.popper || this.$refs.popper;
      var reference = this.reference || this.$refs.reference || this.$slots.reference[0].elm;

      if (!popper || !reference) return;
      if (this.visibleArrow) {
        this.appendArrow(popper);
      }

      if (this.popperJS && this.popperJS.hasOwnProperty('destroy')) {
        this.popperJS.destroy();
      }

      options.placement = this.placement;
      options.offset = this.offset;

      this.$nextTick(function () {
        _this.popperJS = new _popper2.default(reference, popper, options);
        _this.popperJS.onCreate(function (popper) {
          _this.resetTransformOrigin(popper);
          _this.$emit('created', _this);
        });
      });
    },
    updatePopper: function updatePopper() {
      if (this.popperJS) {
        this.popperJS.update();
      } else {
        this.createPopper();
      }
    },
    doDestroy: function doDestroy() {
      if (this.showPopper) return;
      this.popperJS.destroy();
      this.popperJS = null;
    },
    destroyPopper: function destroyPopper() {
      if (this.popperJS) {
        this.resetTransformOrigin(this.popperJS);
      }
    },
    resetTransformOrigin: function resetTransformOrigin(popper) {
      var placementMap = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
      var placement = popper._popper.getAttribute('x-placement').split('-')[0];
      var origin = placementMap[placement];
      popper._popper.style.transformOrigin = ['top', 'bottom'].indexOf(placement) > -1 ? 'center ' + origin : origin + ' center';
    },
    appendArrow: function appendArrow(element) {
      var hash = void 0;
      if (this.appended) {
        return;
      }

      this.appended = true;

      for (var item in element.attributes) {
        if (/^_v-/.test(element.attributes[item].name)) {
          hash = element.attributes[item].name;
          break;
        }
      }

      var arrow = document.createElement('div');

      if (hash) {
        arrow.setAttribute(hash, '');
      }
      arrow.setAttribute('x-arrow', '');
      arrow.className = 'popper__arrow';
      element.appendChild(arrow);
    }
  },

  beforeDestroy: function beforeDestroy() {
    if (this.popperJS) {
      this.popperJS.destroy();
    }
  }
};