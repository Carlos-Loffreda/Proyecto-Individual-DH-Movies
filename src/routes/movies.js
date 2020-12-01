const express = require("express");
const router = express.Router();
var moviesController = require("../controllers/moviesController");

//Rutas.

router.get("/", moviesController.showAll);
router.get("/recommended", moviesController.recommended);
router.get("/new/", moviesController.new);
router.post("/search", moviesController.search);
router.get("/create", moviesController.create);
router.post("/create", moviesController.createNow);
router.get("/detail/:id", moviesController.detail);
router.get("/edit/:id", moviesController.edit);
router.put("/edit/:id", moviesController.editNow);
router.delete("/delete/:id", moviesController.delete);
router.get("/genre/:id", moviesController.genre);
router.get("/actor/:id", moviesController.actor);
router.get("/newPerformance", moviesController.newPerformance);
module.exports = router;
