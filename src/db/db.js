const mysql=require("mysql2")
const {
    DB_USERNAME_PASSWORD,
    DB_NAME,
    DB_HOST,
    DB_PORT,
    DB_USERNAME
} = require('../../config/index.js')

const connectionOptions = {
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    user: DB_USERNAME,
    password: DB_USERNAME_PASSWORD
}

const con=mysql.createConnection(connectionOptions);
con.connect((error) => {
    if(error) {
        console.log(error)
        process.exit(1)
    } else {
        console.log("Success connected")
    }
})


module.exports=con;