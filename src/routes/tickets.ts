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
    var message = {
        notification: {
            title: 'Message from node',
            body: 'hey there'
        },
        token: "cWwwLadI8kGZpgtngXVlyn:APA91bE26iuxPMBW0KKYKUefA75nAKlUx2vAOpnr7dwzl9FrWELjssOmliAxVtQl2K6Lpi9S9UpH5tzYv0RyM7KJCq6YaaxDWK9w6MFRFYkj_70wxGf_HOJHdZ5gwsFMmQd0Fe-DHGof"
    };
    admin.messaging().send(message)
        .then((response: any) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error: any) => {
            console.log('Error sending message:', error);
        });
    return res.status(200).send(results)
})

export default ticketRouter
