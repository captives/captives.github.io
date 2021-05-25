const jwt = require('jwt-simple');
// const JWTService = require('jwt-service');

module.exports = {
    encode(original, jwtkey) {
        return jwt.encode(original, jwtkey);
    },
    decode(encodedContent, jwtKey) {
        return jwt.decode(encodedContent, jwtKey);
    }
}