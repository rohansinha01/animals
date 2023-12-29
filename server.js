require("dotenv").config()
require("./config/db")
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const { allowedNodeEnvironmentFlags } = require("process")

const app = express()
const PORT = process.env.PORT || 3013;

const Animal = require("./models/animals.js")

// const mongoose = require("mongoose")
// const db = mongoose.connection;
// mongoose.connect(process.env.DATABASE_URL)

// db.on("error", (err) => console.log(err.message + `something went wrong with mongo`))
// db.on("connected", () => console.log(`mongo connected`))
// db.on("closed", () => console.log("mongo disconnected"))

app.use(morgan("dev"))
app.use(express.urlencoded({extended: true}))

// Index
app.get("/animals", async (req,res) => {
    let animals = await Animal.find({})

    res.render("index.ejs",{animals: animals.reverse()})
})

// New
app.get("/animals/new", (req, res) => {
    res.render("new.ejs")
})

// Delete
app.delete("/animals/:id", async (req, res) => {
    let deletedAnimal = await Animal.findByIdAndDelete(req.params.id)
    res.send(`animal went upstate to a farm`)
}) 

// Update - PUT
app.put("/animals/:id", async (req, res) => {
    const id = req.params.id
    const newAnimal = req.body
    let updatedAnimal = await Animal.findByIdAndUpdate(
        id, 
        newAnimal, 
        {new: true })
    res.send(updatedAnimal)
})
//CREATE - POST
app.post("/animals", async (req, res) => {
   try{ if (req.body.extinct === "on") {
        req.body.extinct = true
    } else {
            req.body.extinct = false
        }
    let newAnimal = await Animal.create(req.body)
    res.redirect("/animals")

} catch (err) {
    res.send(err)
}
    })

//Show route
app.get ("/animals/:id", async(req, res) => {
let animal = await Animal.findById(req.params.id)
    res.render("show.ejs", {animal})
   } 
)


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})