var cooking = require('cooking');

cooking.set({
  entry: {
    build: './example/index.js'
  },
  dist: './example/dist',
  use: 'vue',
  publicPath: '/example/dist/',
  template: './example/index.html',

  devServer: {
    port: 8700,
    hostname: require('my-local-ip')(),
    publicPath: '/',
    log: false
  },

  extends: ['vue', 'lint']
});

cooking.add('externals.vue', 'Vue');

module.exports = cooking.resolve();