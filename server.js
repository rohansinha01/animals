const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const { allowedNodeEnvironmentFlags } = require("process")

const app = express()
const animals = [{name: 'dog', species: 'canine', extinct: false, location: "Global", lifeExpectancy: 13}]
app.get("/", (req,res) => {
    res.render("index.ejs")
})


app.listen(3000, () => {
    console.log('listening on port 3000')
})