
const express = require('express')


const home = require('../api/routes/home')


module.exports = function (app) {
    app.use('/api/routes/home', home)
}