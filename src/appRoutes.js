const authenticate = require('./authenticate');
// const passport = require('passport')
const authorize = require('./authorize')

const router = require('express').Router();

router.get('/public', authenticate, authorize(['admin', 'user']), (req, res)=>{
    res.status(200).json({message: "I am a Public Route"})
})
// router.get('/protected', passport.authenticate('bearer', {session: false}), (req, res)=>{
//     const user = req.user

//     res.status(200).json({message: "User Login Successful", user })
// })
router.get('/protected', authenticate, authorize(['admin']), (req, res)=>{
    const user = req.user

    res.status(200).json({message: "User Login Successful", user })
})

module.exports = router