const { v4: uuidv4 } = require('uuid');
const tokenSecret = require('./../config').tokenSecret;
const jwt = require('./jwt-service');

function create(data) {
    // const uuid = uuidv4();
    const uuid = data;
    const token = jwt.encode(uuid, tokenSecret);
    console.log("UUID", tokenSecret, uuid, token);

    return token;
}

function load(token) {
    return jwt.decode(token, tokenSecret);
}

module.exports = {
    create, load
}