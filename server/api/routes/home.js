const express = require('express')
const router = express.Router()


router.get('/', async (req, res) => {
    let mainData = reqData()
    console.log('reqData sent')
    res.status(200).json({ hej: "apa" })
})

module.exports = router