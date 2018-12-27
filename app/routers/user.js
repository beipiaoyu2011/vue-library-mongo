const models = require('../models');
const express = require('express');
const router = express.Router();
const utils = require('../utils');


router.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", " * ");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type,username");
    next();
})

router.get('/get', (req, res) => {
    models.userModel.find({}, function (err, data) {
        if (err) return err;
        console.log(data);
        res.send({
            code: 0,
            data: data
        });
    });
});

router.get('/login', (req, res) => {
    const query = req.query;
    if (!query || !query.username || !query.password) {
        res.send(utils.callbackData({
            status: 0,
            code: 101,
            data: 'missing username or password'
        }));
        return false;
    }
    const queryParams = Object.keys(query).join(' ');
    console.log(query, queryParams);
    models.userModel.findOne(query, queryParams, function (err, data) {
        if (err) return err;
        console.log(data);
        if (!data) {
            res.send(utils.callbackData({
                status: 0,
                code: 102,
                data: 'This user is not exist'
            }));
            return false;
        }
        res.send(utils.callbackData({
            status: 0,
            code: 0,
            data: data
        }));
    });
});

router.get('/register', (req, res) => {
    const query = req.query;
    if (!query || !query.username || !query.password) {
        res.send(utils.callbackData({
            status: 0,
            code: 101,
            data: 'missing username or password'
        }));
        return false;
    }
    const queryParams = Object.keys(query).join(' ');
    console.log(query, queryParams);
    models.userModel.findOne(query, queryParams, function (err, data) {
        if (err) return err;
        console.log(data);
        if (!data) {
            models.userModel.create(query, function (err, data) {
                if (err) return err;
                res.send(utils.callbackData({
                    status: 0,
                    code: 0,
                    data: 'success'
                }));
            })
        } else {
            res.send(utils.callbackData({
                status: 0,
                code: 102,
                data: 'This user already exist'
            }));
        }
    });
});

module.exports = router;