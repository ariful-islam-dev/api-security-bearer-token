const authenticate = require('./authenticate');

const router = require('express').Router();

router.get('/public', (req, res)=>{
    res.status(200).json({message: "I am a Public Route"})
})
router.get('/protected', authenticate, (req, res)=>{
    res.status(200).json({message: "I am a Protected Route"})
})

module.exports = router