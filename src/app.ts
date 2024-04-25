import { configDotenv } from 'dotenv';
import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import logger from './utils/logger';
import { Controller } from './types/controller';
import errorMiddleware from './middleware/error';
const env = process.env.NODE_ENV;
configDotenv({
    path: `.${env}.env`,
});

export class App {
    public app: Application
    constructor(controllers: Controller[]) {
        this.app = express()
        this.initializeMiddlewares()
        this.initializeControllers(controllers)
    }
    private initializeMiddlewares() {
        this.app.use(express.json())
        this.app.use(errorMiddleware)
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cors())
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            logger.info(`[${req.method}] ${req.url} - ${req.ip}`)
            next()
        })
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach(controller => {
            this.app.use(controller.path, controller.router)
        })
    }
    public listen() {
        this.app.listen(process.env.PORT, () => {
            logger.info(`Environment: ${process.env.NODE_ENV}`)
            logger.info(`Server is running on port ${process.env.PORT}`)
        })
    }
}
