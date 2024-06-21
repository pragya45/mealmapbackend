//importing
const express = require('express');
const env = require('dotenv')

//Making express app
const app = express();
env.config()

console.log("Hello World!")


// creating test route
app.get("/test", (req, res) => {
    res.status(200).json("Hello from server");
})

//register
app.use('/api/user', require('./routes/userRoutes'))


// defining port
const PORT = process.env.PORT;
// run the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})