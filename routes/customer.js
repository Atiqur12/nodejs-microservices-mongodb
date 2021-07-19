const express = require("express")
const router = express.Router()

const customer = require("../database").customer;


/**
 * @swagger
 * /:
 *   get:
 *     summary: get all customer by token
 *     description: you need to provide token for this api to work
*/
/**
 * @swagger
 * /:
 *   post:
 *     summary: create a new customer sending name,email,phone,password
 *     description: after success you will creating new adin
*/
/**
 * @swagger
 * /:
 *   patch:
 *     summary: udpate customer by id here
 *     description: any customer attributes like name,email,phone,password
*/
/**
 * @swagger
 * /:
 *   delete:
 *     summary: test get request here
 *     description: get request goes here
*/




router.get("/", (req, res, next) => {
  customer.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    });
})
router.post("/", (req, res, next) => {
  customer.create(req.body)
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
  customer.findByIdAndUpdate(req.params.id)
    .then(d => {
      d.password=req.body.password
      return d.save()
    })
    .then(d=>res.json({status:true,data:d}))
    .catch(err => {
      res.status(500).send({
        message: "Error updating customer with id=" + id
      });
    });
})
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  customer.findByIdAndDelete(req.params.id)
    .then(num => res.json({status:true,data:"deleted"}))
  .catch(err => {
    res.status(500).send({
      message: "Could not delete customer with id=" + id
    });
  });
})


module.exports = router