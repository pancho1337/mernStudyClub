const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult } = require('express-validator/check')

const User = require('../../models/User')

router.get('/', auth, async(req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password')
        res.json({user})
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})
// post api/auth public get to get token to access private routes
router.post('/', [
    check('email', 'please enter valid email').isEmail(),
    check('password', 'give me a password').exists()
], 
async (req, res) => {
    console.log("post users body ===> ",req.body)
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const { email, password } = req.body
    try{
        // check user exist 
        let user = await User.findOne({ email })
        if(!user){
            res.status(400).json({ errors: [{ msg: "Invalid Credentials"}] })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res
                .status(400)
                .json({ errors: [{ msg: "Invalid Creds"}] })
        }
        // return jsonwebtoken 
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, 
            config.get("jwtToken"),
            { expiresIn: 3600},
            (err, token) => {
                if(err) throw err
                console.log('user saved to the db')
                res.json({ token })
            }
        )
        // res.send('User registered')
    } catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    } 
})
module.exports = router