const Sequelize = require("sequelize");
const connection = require("./database");

const List = connection.define('lists', {
    task:{
        type: Sequelize.TEXT,
        alllowNull: false
    }
})

List.sync({force:false})

module.exports = List;