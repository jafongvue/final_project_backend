const app = require('./app.js')
const {
    PORT
} = require('../config/index.js')


app.listen(PORT || 80, () => console.log("The server is start is starting now"))