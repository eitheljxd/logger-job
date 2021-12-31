import Ticket from '../db/models/tickets';
import * as service from '../services/ticketService'
import * as mapper from './mapper'

export const getAll = async (): Promise<Ticket[]> => {
    return (await service.getAll()).map(mapper.toTicket)
}