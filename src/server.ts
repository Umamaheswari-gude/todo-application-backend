import express from "express";
import cors from "cors";
import router from "./routes/taskRoute/taskRoute";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/tasks", router);
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;