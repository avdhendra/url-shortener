import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import db from "./models/index.js";
import authRoute from "./routes/auth.route.js"
import urlRoute from "./routes/url.route.js"
import cookieParser from "cookie-parser";

dotenv.config()


const app = express();

app.use(cors({
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: ['http://localhost:3000']
}));
app.use(morgan("combined"))
app.use(express.json())
app.use(cookieParser())



app.use('/auth', authRoute)
app.use('/url', urlRoute)


db.sequelize.sync().then(() => {
    console.log("Database is online");
    app.listen(process.env.PORT, () => {
        console.log("Server is running on PORT"+process.env.PORT)
    })
}).catch((error) => {
    console.log("Error Syncing sequelize:"+error)
})