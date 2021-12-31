import * as ticketDal from '../db/dal/tickets'
import { TicketOutput } from '../db/models/tickets'

export const getAll = (): Promise<TicketOutput[]> => {
    return ticketDal.getAll()
}