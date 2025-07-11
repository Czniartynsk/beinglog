import express from "express"
// import "express-async-errors"

import { errorHandling } from "./middlewares/error-handling"
import { routes } from "./routes"
import cors from "cors";

const app = express()


app.use(cors({
  origin: "http://localhost:5173", // ou "*" durante testes
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json())
app.use(routes)

app.use(errorHandling)

export { app }