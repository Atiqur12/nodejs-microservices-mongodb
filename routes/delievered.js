const express = require("express")
const router = express.Router()

const delivered = require("../database").delivered;


/**
 * @swagger
 * /:
 *   get:
 *     summary: get all delivered by token
 *     description: you need to provide token for this api to work
*/
/**
 * @swagger
 * /:
 *   post:
 *     summary: create a new delivered sending name,email,phone,password
 *     description: after success you will creating new adin
*/
/**
 * @swagger
 * /:
 *   patch:
 *     summary: udpate delivered by id here
 *     description: any delivered attributes like name,email,phone,password
*/
/**
 * @swagger
 * /:
 *   delete:
 *     summary: test get request here
 *     description: get request goes here
*/




router.get("/", (req, res, next) => {
  delivered.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving delivereds."
      });
    });
})
router.post("/", (req, res, next) => {
  delivered.create(req.body)
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
  delivered.findByIdAndUpdate(req.params.id)
    .then(d => {
      d.product=req.body.product
      return d.save()
    })
    .then(d=>res.json({status:true,data:d}))
    .catch(err => {
      res.status(500).send({
        message: "Error updating delivered with id=" + id
      });
    });
})
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  delivered.findByIdAndDelete(req.params.id)
    .then(num => res.json({status:true,data:"deleted"}))
  .catch(err => {
    res.status(500).send({
      message: "Could not delete delivered with id=" + id
    });
  });
})


module.exports = router