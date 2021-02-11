import { name, version, author } from "../../../package.json";
import express from "express";
import usersRourter from "./users";
import { errors } from "celebrate";

const router = express.Router();

// === Start middlewares ===

// === End middlewares ===

// mount the all resources
router.use("/users", usersRourter);

/* GET API main page */
router.get("/", function(req, res) {
  res.json({ name, version, author });
});

//Por si atacan a una url que no tenemos definida, que no haga crash el programa
router.all("*", function(req, res) {
  res.status(404).send("Url not found.");
});

//Para mostrar los errores del celebrate cuando validamos los request params y body
router.use(errors());

module.exports = router;
