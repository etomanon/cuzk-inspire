const crypto = require('crypto');
const algorithm = 'aes-128-cbc';

let cipher = {
    encrypt: function encrypt(text) {
        let cipher = crypto.createCipher(algorithm, process.env.CRYPTO_KEY)
        let crypted = cipher.update(text,'utf8','hex')
        crypted += cipher.final('hex');
        return crypted;
    },
    decrypt: function decrypt(text) {
        let decipher = crypto.createDecipher(algorithm, process.env.CRYPTO_KEY)
        let dec = decipher.update(text,'hex','utf8')
        dec += decipher.final('utf8');
        return dec;
    }
};

module.exports = cipher;


