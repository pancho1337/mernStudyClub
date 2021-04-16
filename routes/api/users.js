const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult } = require('express-validator/check')

const User = require('../../models/User')
// console.log('router ===> ', router)

router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'please enter valid email').isEmail(),
    check('password', 'please enter a proper password').isLength({min: 6})
], 
async (req, res) => {
    console.log("post users body ===> ",req.body)
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const { name, email, password } = req.body
    try{
        // check user exist 
        let user = await User.findOne({ email })

        if(user){
            res.status(400).json({ errors: [{ msg: "User already exist"}] })
        }
        // get avatar 
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        user = new User({
            name, 
            email,
            avatar,
            password
        })
        // encrypt password 
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save()
        // return jsonwebtoken 
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, 
            config.get("jwtToken"),
            { expiresIn: 36000},
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