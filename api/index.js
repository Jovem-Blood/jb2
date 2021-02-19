const axios = require('axios').default;
const con = require('./../config.json');

axios.defaults.baseURL = con.apiUrl;
axios.interceptors.request.use(request => {
    request.data = {
        token: con.apiToken,
        ...request.data,
    };
    return request;
});

module.exports = axios;