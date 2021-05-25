const path = require('path');
const fs = require('fs');


console.log(__dirname);
console.log(__filename);
console.log(process.cwd());
console.log(path.join(__dirname, './data'));
console.log(path.join(__dirname, '/data'));
console.log(path.join(process.cwd(), '/data'));