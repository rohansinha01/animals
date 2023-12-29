const mongoose = require("mongoose")

const { Schema, model } = mongoose;

const animalSchema = new Schema ({
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number

})

const Animal = model("Animal", animalSchema)

module.exports = Animal