// Define a rota para obter as condições climáticas de diferentes cidades.
const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weatherController.js");

router.get("/get", weatherController.getWeather);

module.exports = router;
