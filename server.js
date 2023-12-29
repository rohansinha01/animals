require("dotenv").config()
require("./config/db")
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const { allowedNodeEnvironmentFlags } = require("process")
const animalRouter = require("./routes/animals")

const app = express()
const PORT = process.env.PORT || 3013;
const seedData = require("./models/seed.js")

const Animal = require("./models/animals.js")

// const mongoose = require("mongoose")
// const db = mongoose.connection;
// mongoose.connect(process.env.DATABASE_URL)

// db.on("error", (err) => console.log(err.message + `something went wrong with mongo`))
// db.on("connected", () => console.log(`mongo connected`))
// db.on("closed", () => console.log("mongo disconnected"))

app.use((req, res, next) => {
    req.model = {
        Animal,
        seedData
    }
    next()
})

app.use(morgan("dev"))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))

app.use("/animals", animalRouter)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})