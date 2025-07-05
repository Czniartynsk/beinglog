import { app } from "@/app";
import { env } from "./env";
import cors from "cors";

const PORT = env.PORT

app.use(cors({
  origin: "http://localhost:5173", // ou "*" durante testes
  credentials: true
}));


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
