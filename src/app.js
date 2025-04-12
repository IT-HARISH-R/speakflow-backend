import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import chatRoutes from "./routes/chatRouts.js";

const app = express();

app.use(express.json()); 
app.use(cookieParser());
app.use(
    cors({ 
        origin: "https://speak-flowt.netlify.app",
        credentials: true,
    })
);
app.use('/api',chatRoutes)






export default app; 
