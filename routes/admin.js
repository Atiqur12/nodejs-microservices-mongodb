const express = require("express")
const router = express.Router()

const admin = require("../database").admin;


/**
 * @swagger
 * /:
 *   get:
 *     summary: get all admin by token
 *     description: you need to provide token for this api to work
*/
/**
 * @swagger
 * /:
 *   post:
 *     summary: create a new admin sending name,email,phone,password
 *     description: after success you will creating new adin
*/
/**
 * @swagger
 * /:
 *   patch:
 *     summary: udpate admin by id here
 *     description: any admin attributes like name,email,phone,password
*/
/**
 * @swagger
 * /:
 *   delete:
 *     summary: test get request here
 *     description: get request goes here
*/




router.get("/", (req, res, next) => {
  admin.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Admins."
      });
    });
})
router.post("/", (req, res, next) => {
  admin.create(req.body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
})
router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  admin.findByIdAndUpdate(req.params.id)
    .then(d => {
      d.password=req.body.password
      return d.save()
    })
    .then(d=>res.json({status:true,data:d}))
    .catch(err => {
      res.status(500).send({
        message: "Error updating Admin with id=" + id
      });
    });
})
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  admin.findByIdAndDelete(req.params.id)
    .then(num => res.json({status:true,data:"deleted"}))
  .catch(err => {
    res.status(500).send({
      message: "Could not delete admin with id=" + id
    });
  });
})


module.exports = router