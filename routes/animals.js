const express = require("express")
// const Animal = require("../models/animals")
const router = express.Router()

const animalController = require("../controllers/animals")

// Index
router.get("/", animalController.index) 
// New
router.get("/new", animalController.newForm)

// Delete
router.delete("/:id", animalController.destroy) 

// Update - PUT
router.put("/:id", animalController.update)
//CREATE - POST
router.post("/", animalController.create) 

//Edit route
router.get("/edit/:id", animalController.edit) 

// Seed - GET
router.get("/seed", animalController.seed) 

//Show route
router.get ("/:id", animalController.show)

module.exports = router