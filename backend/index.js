const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRoute } = require("./routes/userRoute");
const { bookRouter } = require("./routes/bookRoute");



const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRoute);
app.use("/book", bookRouter);

app.get("/", (req, res)=>{
    res.status(200).send("Welcome to Read Right Backend")
})

app.listen(8080, async ()=>{
    try {
        await connection;
        console.log("Connected to DB")
        console.log("Server is live at Port 8080")
    } catch (error) {
        console.log(error)
    }
})