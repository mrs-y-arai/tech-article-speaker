import express from "express";
import { BookmarkRouter } from "~/routes/BookmarkRoute.js";
import cors from "cors";
import { UserRouter } from "~/routes/UserRoute.js";
const app = express();

const API_BASE_URL = "/api/v1";
const port = 8080;
const frontendBaseUrl = process.env.FRONTEND_BASE_URL;

const corsOptions = {
  origin: frontendBaseUrl,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200,
};

// app.use(cors(corsOptions));
app.use(express.json());
app.use(`${API_BASE_URL}/bookmarks`, BookmarkRouter);
app.use(`${API_BASE_URL}/users`, UserRouter);

app.listen(port, () => {
  console.log("Server running");
});
