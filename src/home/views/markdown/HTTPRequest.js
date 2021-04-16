const axios = require('axios');
const request = (path, data) => {
    return new Promise((resolve, reject) => {
        axios.post(location.origin.replace(location.port, 2020) + path, data).then(({ data }) => resolve(data)).catch(reject);
    });
};

module.exports = { request };