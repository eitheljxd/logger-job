import Ticket from '../db/models/tickets';
import { DataPushNotification } from '../models/data.model';
import * as service from '../services/ticketService'
import * as mapper from './mapper'

export const getAll = async (): Promise<DataPushNotification[]> => {
    return (await service.getAll());
}