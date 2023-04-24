const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Items = sequelize.define("Items",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    Name:{
        type:Sequelize.STRING,
    },
    Description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Price:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
     Quantity:{
        type:Sequelize.INTEGER,
        allowNull:false,
     }
})


module.exports = Items;