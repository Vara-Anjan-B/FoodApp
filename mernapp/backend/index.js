import express from "express";
import connectToMongo from "./db.js";
import router from "./Routes/CreateUser.js";
import router1 from "./Routes/DisplayData.js"


const app = express();
const port = 5000;

connectToMongo();

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.get("/",(req,res) => {
    res.send("Hello");
})

app.use(express.json());
app.use("/api",router)
app.use("/api",router1)

app.listen(port,() => {
    console.log(`Your server is currently running on port ${port}`);
});