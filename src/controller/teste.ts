import { Request, Response, Router } from "express"

export class TesteController {
    public path = '/'
    public router = Router()
    constructor() {
        this.initializeRoutes()
    }
    public initializeRoutes() {
        this.router.get(this.path, (req: Request, res: Response) => {
            res.status(200).send('Hello World!')
        })
    }
}