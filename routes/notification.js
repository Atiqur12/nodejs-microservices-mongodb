const express = require("express")
const router = express.Router()

const notification = require("../database").notification;


/**
 * @swagger
 * /:
 *   get:
 *     summary: get all notification by token
 *     description: you need to provide token for this api to work
*/
/**
 * @swagger
 * /:
 *   post:
 *     summary: create a new notification sending name,email,phone,password
 *     description: after success you will creating new adin
*/
/**
 * @swagger
 * /:
 *   patch:
 *     summary: udpate notification by id here
 *     description: any notification attributes like name,email,phone,password
*/
/**
 * @swagger
 * /:
 *   delete:
 *     summary: test get request here
 *     description: get request goes here
*/




router.get("/", (req, res, next) => {
  notification.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving notifications."
      });
    });
})
router.post("/", (req, res, next) => {
  notification.create(req.body)
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
  notification.findByIdAndUpdate(req.params.id)
    .then(d => {
      d.message=req.body.message
      return d.save()
    })
    .then(d=>res.json({status:true,data:d}))
    .catch(err => {
      res.status(500).send({
        message: "Error updating notification with id=" + id
      });
    });
})
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  notification.findByIdAndDelete(req.params.id)
    .then(num => res.json({status:true,data:"deleted"}))
  .catch(err => {
    res.status(500).send({
      message: "Could not delete notification with id=" + id
    });
  });
})


module.exports = router