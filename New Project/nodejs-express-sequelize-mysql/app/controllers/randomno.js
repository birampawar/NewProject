var crypto = require('crypto');

function randomvalue(len){
    return crypto.randomBytes(Math.ceil(len/2)).
    toString('hex').
    slice(0,len);
   
};
//var value=randomvalue(6);
//console.log(value);
module.exports.randomvalue =randomvalue;