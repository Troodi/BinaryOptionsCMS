window._ = require('lodash');
window.io = require('socket.io-client');

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';