const User = require('../models/user');
const cipher = require('../helpers/cipher')

module.exports = (req, res, next) => {
    let token = req.body.apiKey;
    if(token === undefined) {
        token =  cipher.encrypt(req.query.key);
    }
    else {
        token = cipher.encrypt(req.body.apiKey);
    }
    User.find({ 'freeToken': token })
        .exec()
        .then(result => {
            if (result.length === 0) {
                return res.status(403).json({
                    message: 'wrong API key'
                })
            }
            let user = result[0]
            // let originalDate = new Date(user.dateToken)
            // originalDate.setMonth(originalDate.getMonth() + 1)
            // let refreshDate = originalDate.getTime()
            // let now = new Date(Date.now()).getTime()
            // if (now >= refreshDate) {
            //     user.dateToken = Date.now()
            //     user.hits = 0
            // }
            // if (user.hits >= 10000000) {
            //     return res.status(403).json({
            //         message: 'exceeded API limit per month'
            //     })
            // }

            user.hits += 1;
            user.save();
            next();

        })
        .catch(err => {
            return res.status(500).json({
                error: err
            })
        })

}