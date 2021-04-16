const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, res, next){
    // obten token del head
    const token  = req.header('x-auth-token')
    // check if there is no token
    if(!token){
        return res.status(401).json({msg: 'no token, auth deny'})
    }
    //check token 
    try {
        const decoded = jwt.verify(token, config.get('jwtToken'))
        req.user = decoded.user
        next()
    } catch (err){
        res.status(401).json({msg: ' token is not valid '})
    }
}