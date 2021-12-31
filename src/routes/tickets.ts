import { Request, Response, Router } from 'express'
import * as ticketController from '../controllers/index'
const admin = require("firebase-admin");
const serviceAccount = require("../pdm-logger-firebase-key.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const ticketRouter = Router();
ticketRouter.get('/', async (req: Request, res: Response) => {
    const results = await ticketController.getAll();
    results.forEach(element => {
        const message = {
            notification: {
                body: `You have a ticket that will start soon.`,
                title: `Start the ticket ${element.ti_code}` 
            },
            token: element.utf_token
        };
        admin.messaging().send(message)
            .then((response: any) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
            })
            .catch((error: any) => {
                console.log('Error sending message:', error);
            });
    });
  
    return res.status(200).send(results)
})

export default ticketRouter
