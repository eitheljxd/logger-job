import Ticket from "./models/tickets"

require('dotenv').config()


const dbInit = () => Promise.all([
    Ticket.sync({ alter: false, force: false })
])

export default dbInit 