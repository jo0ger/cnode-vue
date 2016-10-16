# Overview
vue-popup is a popup mixin for vue.js

# Installation
First, install `vue-popup` from npm:
```bash
$ npm install vue-popup
```

Then import it:
```javascript
import Popup from 'vue-popup';
require('vue-popup/lib/popup.css');
```

# Usage
In a vue instance, define its `mixins`:
```javascript
mixins: [Popup]
```
Then `vue-popup`'s APIs(see below) are accessible via the vue instance's `props` attribute.

# Example
Goal: on your page you have a button. When it's clicked, an alert pops up.

First let's deal with the alert component in `alert.vue`:
```html
<template>
  <div v-if="rendered" v-show="visible" class="alert">
    <p>Alert!</p>
  </div>
</template>
<style>
  .alert {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
<script>
  import Popup from 'vue-popup';
  require('vue-popup/lib/popup.css');
  export default {
      mixins: [Popup],
      props: {
        modal: {
          default: true
        },
        closeOnClickModal: {
          default: true
        }
      }
    };
</script>
```
As you can see, `v-if="rendered"` and `v-show="visible"` should be added on the outermost tag of the component. Its `props` attribute has two keys: `modal` and `closeOnClickModal`, please refer to API below for detailed information.

That's it for the alert component. Let's move on to the main page:
```html
<template>
  <button @click="alertVisible = true">Open Dialog</button>
  <alert :visible.sync="alertVisible"></alert>
</template>
<script>
  const Alert = require('./alert.vue');
  export default {
    components: { Alert },
    data() {
      return {
        alertVisible: false
      };
    }
  };
</script>
```
Note that the main page's `alertVisible` syncs with the component's `visible`, so when the button is clicked, `alertVisible` becomes `true` thus the alert component pops up.

# API
| Option             | Description                                                      | Value                  | Default  |
|--------------------|------------------------------------------------------------------|------------------------|----------|
| visible            | visibility of the popup element                                  | Boolean                | 'false'  |
| openDelay          | time before the popup element opens                              | Number, in millisecond |          | 
| closeDelay         | time before the popup element closes                             | Number, in millisecond |          |
| zIndex             | z-index of the popup element                                     | Number                 |          |
| modal              | determines if a modal pops with the popup element                | Boolean                | 'false'  |
| modalClass         | class name of the modal                                          | String                 |          |
| closeOnPressEscape | determines if the popup element closes when escape is clicked    | Boolean                | 'false'  |
| closeOnClickModal  | determines if the popup element closes when the modal is clicked | Boolean                | 'false'  |
