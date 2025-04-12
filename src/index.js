import app from "./app.js";
import mongoose from "mongoose";
import { MONGO_DB_URI, PORT } from "./utlis/config.js";

const port = PORT;

mongoose.connect(MONGO_DB_URI)
    .then(() => {
        console.log("Database connected successfully");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });
