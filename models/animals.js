const mongoose = require("mongoose")

const { Schema, model } = mongoose;

const animalSchema = new mongoose.Schema ({
    species: { type: String, required: true},
    location: { type: String, required: true},
    lifeExpectancy: { type: Number, required: true},
    extinct: Boolean,
})

const Animal = model("Animal", animalSchema)

module.exports = Animal