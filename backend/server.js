import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config';
import figureRoutes from './routes/figureRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
//Middleware
app.use(cors());
app.use(express.json());

//MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to MongoDB..."))
.catch((err) => console.error("Could not connect to MongoDB:", err));

//Define routes
app.use("/api/figures", figureRoutes);
app.use("/api/users", userRoutes);

//Health check
app.get('/', (req, res) => {
    res.send("Action fig API is running");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`)
})