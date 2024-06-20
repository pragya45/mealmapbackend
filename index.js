//importing
const express = require('express');


//Making express app
const app = express();

console.log("Hello World!")


// creating test route
app.get("/test", (req, res) => {
    res.status(200).json("Hello from server");
})


// defining port
const PORT = process.env.PORT;
// run the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${5000}`)
})