const bcrypt = require('bcrypt');
const saltRounds = 10;

async function passwordMiddleware(req, res, next){

    const passwordToHash = req.body.password;
    
    const hashed = await bcrypt.hash(passwordToHash, saltRounds);

    req.hashedPassword = hashed;

    next();
}

module.exports = {
    passwordMiddleware
}