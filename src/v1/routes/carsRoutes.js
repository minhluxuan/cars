const express = require("express");
const carsController = require("../controllers/carsController");

const router = express.Router();

router.get("/", carsController.getAllCars);
router.get("/:carId", carsController.getOneCar);
router.post("/", carsController.createNewCar);
router.patch("/:carId", carsController.updateOneCar);
router.delete("/:carId", carsController.deleteOneCar);

module.exports = router;
