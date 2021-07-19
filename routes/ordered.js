const express = require("express")
const router = express.Router()

const ordered = require("../database").ordered;


/**
 * @swagger
 * /:
 *   get:
 *     summary: get all ordered by token
 *     description: you need to provide token for this api to work
*/
/**
 * @swagger
 * /:
 *   post:
 *     summary: create a new ordered sending name,email,phone,password
 *     description: after success you will creating new adin
*/
/**
 * @swagger
 * /:
 *   patch:
 *     summary: udpate ordered by id here
 *     description: any ordered attributes like name,email,phone,password
*/
/**
 * @swagger
 * /:
 *   delete:
 *     summary: test get request here
 *     description: get request goes here
*/




router.get("/", (req, res, next) => {
  ordered.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ordereds."
      });
    });
})
router.post("/", (req, res, next) => {
  ordered.create(req.body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ordered."
      });
    });
})
router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  ordered.findByIdAndUpdate(req.params.id)
    .then(d => {
      d.password=req.body.password
      return d.save()
    })
    .then(d=>res.json({status:true,data:d}))
    .catch(err => {
      res.status(500).send({
        message: "Error updating ordered with id=" + id
      });
    });
})
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  ordered.findByIdAndDelete(req.params.id)
    .then(num => res.json({status:true,data:"deleted"}))
  .catch(err => {
    res.status(500).send({
      message: "Could not delete ordered with id=" + id
    });
  });
})


module.exports = router