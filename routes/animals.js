const express = require("express")
// const Animal = require("../models/animals")
const router = express.Router()

// Index
router.get("/", async (req,res) => {

    let animals = await req.model.Animal.find({})

    res.render("index.ejs",{animals: animals.reverse()})
})

// New
router.get("/new", (req, res) => {
    res.render("new.ejs")
})

// Delete
router.delete("/:id", async (req, res) => {
    try {
    let deletedAnimal = await req.model.Animal.findByIdAndDelete(req.params.id)
    res.redirect("/animals") 
} 
    catch (error) {
        res.status(500).send("something went wrong when deleting")
    }
}) 

// Update - PUT
router.put("/:id", async (req, res) => {
if (req.body.extinct === "on") {
    req.body.extinct = true 
} else{
    req.body.extinct = false
}
let updatedAnimal = await req.model.Animal.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
        new: true
    }
)
    res.redirect(`/animals/${updatedAnimal._id}`)
})
//CREATE - POST
router.post("/", async (req, res) => {
   try{ if (req.body.extinct === "on") {
        req.body.extinct = true
    } else {
            req.body.extinct = false
        }
    let newAnimal = await req.model.Animal.create(req.body)
    res.redirect("/animals")

} catch (err) {
    res.send(err)
}
    })

//Edit route
router.get("/edit/:id", async (req, res) => {
    try {
        let foundAnimal = await req.model.Animal.findById(req.params.id) 
        res.render("edit.ejs", {
            animal: foundAnimal
        })
        
    } catch (error){
        res.send("hello")
    }
})

// Seed - GET
router.get("/seed", async (req, res) => {
    try {
        await req.model.Animal.deleteMany({})
        await req.model.Animal.create(
           req.model.seedData
        )
        res.redirect("/animals")
    } catch (error) {
        res.send("something is wrong")
    }
})

//Show route
router.get ("/:id", async(req, res) => {
let animal = await req.model.Animal.findById(req.params.id)
    res.render("show.ejs", {animal})
   } 
)

module.exports = router