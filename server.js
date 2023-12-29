require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const { allowedNodeEnvironmentFlags } = require("process")

const app = express()
const PORT = process.env.PORT || 3013;

const Animal = require("./models/animals.js")

const mongoose = require("mongoose")
const db = mongoose.connection;
mongoose.connect(process.env.DATABASE_URL)

db.on("error", (err) => console.log(err.message + `something went wrong with mongo`))
db.on("connected", () => console.log(`mongo connected`))
db.on("closed", () => console.log("mongo disconnected"))

app.use(morgan("dev"))
app.use(express.urlencoded({extended: true}))


app.get("/", (req,res) => {
    res.render("index.ejs")
})
//CREATE - POST
app.post("/animals", (req, res) => {
    res.send(req.body)
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})