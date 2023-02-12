import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import gamesRouter from "./routes/GamesRoutes.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT

//routes
app.use([ gamesRouter ])

app.listen(PORT, () => console.log("Servidor online na porta: " + PORT)) 