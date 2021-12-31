import express, { Router } from 'express';
import ticketRouter from './tickets';

const app = express();
const router = Router()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router.use('/notify', ticketRouter)

export default router
