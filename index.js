import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import dbConnection from "./utils/index.js";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddleware.js";

import routes from "./routes/index.js";

dotenv.config();
dbConnection();
const PORT = process.env.PORT || 5000;

const app = express();

// origin to get only requests from the defined ports
// methods means it can access only requests from the following methods
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.head('/api/users', (req, res) => {
    // Handle HEAD request for /api/users
    res.status(200).end(); // Return a 200 OK response
});
app.get('/', (req, res) => {
    res.send('Welcome to your Express.js application!');
});


app.use("/api", routes);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () =>
    console.log("Server Started at port " + PORT)
);
