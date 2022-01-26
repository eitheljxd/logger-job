import express, { Application, Request, Response } from 'express'
import routes from './routes'
import dbInit from './db/init'
import * as dotenv from 'dotenv';

dbInit();
const port = 3000
dotenv.config();

export const get = () => {
    const app: Application = express()
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.get('/', async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({ message: `Welcome to PDM Logger - Push Notifications! Endpoints available at http://domain:${port}/api/v1` })
    })

    app.use('/api/v1', routes)

    return app
}

export const handler = () => {
    const app = get()
    try {
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`)
        })
    } catch (error: any) {
        console.log(`Error occurred: ${error.message}`)
    }
}

handler()