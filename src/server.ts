import express, { NextFunction, Request, Response } from "express"
import errorMiddleware from "./middleware/error"
import logger from "./utils/logger"
import cors from 'cors'
import { router } from "./routes/routes"
import { configDotenv } from "dotenv"
const app = express()
const env = process.env.NODE_ENV;
configDotenv({
    path: `.${env}.env`,
});

app.use(express.json())
app.use(errorMiddleware)
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(`[${req.method}] ${req.url} - ${req.ip}`)
    next()
})

app.use(router)


app.listen(process.env.PORT, () => {
    logger.info(`Env: ${env}`)
    logger.info(`Server running on port ${process.env.PORT}`)

})