const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const bodyParser = require("body-parser")
const userRoutes = require("./routes/userRoutes")
const categoryRoutes = require('./routes/categoryRoutes')
const serviceRoutes = require('./routes/serviceRoutes')
const databaseConnection = require("./databaseConnection")
dotenv.config();
const app = express();

//middleware 
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// router middleware 
app.use("/user", userRoutes)
app.use("/category", categoryRoutes)
app.use("/service", serviceRoutes)

//testing API 
app.get("/", (req, res) => {
    res.send("welcome to testing.")
})


app.listen(process.env.PORT, () => {
    console.log(`server is stared http://localhost:${process.env.PORT}`)

    //db connection
    databaseConnection();
})
