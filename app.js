const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const Sequelize = require("./util/database");
const cors = require("cors");

app.use(bodyParser.json({urlencoded:true}));
app.use(cors())

const itemControllers = require("./controllers/ItemControllers");


app.get("/",itemControllers.getItems);
app.post("/",itemControllers.postItems);
app.put("/:id" , itemControllers.putItems);


Sequelize.sync()
.then((res)=>{
    console.log("database synchronised")
})
.catch(err=>console.log(err));

app.listen(3000,()=>{
    console.log("connected to localhost")
})