

import Ticket, { TicketInput, TicketOutput } from '../models/tickets'

export const create = async (payload: TicketInput): Promise<TicketOutput> => {
    const ingredient = await Ticket.create(payload)
    return ingredient
}
export const getAll = async (filters?: TicketInput): Promise<TicketOutput[]> => {
    return Ticket.findAll({
        where: {
            state: 1
        },
    })
}