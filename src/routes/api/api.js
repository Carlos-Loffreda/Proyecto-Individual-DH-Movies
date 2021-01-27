const express = require("express");
const router = express.Router();
var apiController = require("../../controllers/api/apiController");

//Rutas.

router.get("/", apiController.showAll);


module.exports = router;
