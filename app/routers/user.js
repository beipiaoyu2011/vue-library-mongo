const models = require('../models');
const express = require('express');
const router = express.Router();


router.all('*', (req, res, next)=>{
    res.header("Access-Control-Allow-Origin", " * ");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type,username");
    next();
})

router.get('/get', (req, res) => {
    models.userModel.find({}, function (err, data) {
        if (err) return err;
        console.log(data);
        res.send(data);
    });
});

module.exports = router;