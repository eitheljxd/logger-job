import Ticket, { TicketOutput } from "../db/models/tickets"

export const toTicket = (ingredient: TicketOutput): any => {
    return {
        row_ticket: ingredient.row_ticket,
        ti_description: ingredient.ti_description,
        ti_code: ingredient.ti_code,
        ti_location_start: ingredient.ti_location_start,
        ti_location_end: ingredient.ti_location_end,
        state: ingredient.state
    }
}