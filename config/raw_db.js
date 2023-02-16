const mysql = require("mysql")
const config = require("./configs")
const conn = mysql.createConnection(config.database.mysql)

export default conn