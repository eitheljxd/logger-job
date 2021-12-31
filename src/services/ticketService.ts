import * as ticketDal from '../db/dal/tickets'
import { DataPushNotification } from '../models/data.model'

export const getAll = (): Promise<DataPushNotification[]> => {
    return ticketDal.getAll()
}