import express from "express";
import { Users } from "../controllers";
import { celebrate, Joi } from "celebrate";
const router = express.Router();

router.get("/getusers", function(req, res) {
  try {
    Users.getUsers(null, req, res);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post(
  "/createUsers",
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        birthDate: Joi.string().required(),
        address: Joi.object().keys({
          street: Joi.string().required(),
          state: Joi.string().required(),
          city: Joi.string().required(),
          country: Joi.string().required(),
          zip: Joi.string().required()
        })
      })
    },
    { abortEarly: false }
  ),
  function(req, res) {
    try {
      Users.createUsers(null, req, res);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

router.get(
  "/getusersById/:userId",
  celebrate(
    {
      params: {
        userId: Joi.number()
          .integer()
          .required()
          .label("Invalid user id")
      }
    },
    { abortEarly: false }
  ),
  function(req, res) {
    try {
      Users.getUsersById(null, req, res);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

router.put(
  "/updateUsersById/:userId",
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        birthDate: Joi.string().required(),
        address: Joi.object().keys({
          street: Joi.string().required(),
          state: Joi.string().required(),
          city: Joi.string().required(),
          country: Joi.string().required(),
          zip: Joi.string().required()
        })
      }),
      params: {
        userId: Joi.number()
          .integer()
          .required()
          .label("Invalid user id")
      }
    },
    { abortEarly: false }
  ),
  function(req, res) {
    try {
      Users.updateUsersById(null, req, res);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

router.delete(
  "/deleteUsersById/:userId",
  celebrate(
    {
      params: {
        userId: Joi.number()
          .integer()
          .required()
          .label("Invalid user id")
      }
    },
    { abortEarly: false }
  ),
  function(req, res) {
    try {
      Users.deleteUsersById(null, req, res);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

module.exports = router;
