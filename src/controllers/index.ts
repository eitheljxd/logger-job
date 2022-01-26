import { DataPushNotification } from '../models/data.model';
import * as service from '../services/ticketService'

export const getAll = async (): Promise<DataPushNotification[]> => {
    return (await service.getAll());
}