const express = require("express")
const router = express.Router()
const services = require("../services")

const models = require("../database")

/**
 * @swagger
 * /:
 *   post:
 *     summary: test get request here
 *     description: get request goes here
*/



router.post("/", (req, res, next) => {
    let { email, password, role } = req.body
    models[role].find({ email: email, password: password })
        .then(d => d._id)
        .then(d => services.sign(d, role))
        .then(d => res.status(200).json({ status: true, data: d, message: "loggedin as "+role+" kindly save this token for accesssing "+role+" pages" }))
        .catch(e => res.status(404).json({ status: false, data: [], message: "failed to login as "+role, error: e }))

})


module.exports = router