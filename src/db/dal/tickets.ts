

import { DataPushNotification } from '../../models/data.model'
import { getSecrets } from '../../utils/utilsBD'
import sequelizeConnection from '../config'
import Ticket, { TicketInput, TicketOutput } from '../models/tickets'

export const getAll = async (filters?: TicketInput): Promise<DataPushNotification[]> => {
    const {sp_generatePush} = await getSecrets(
        process.env.SEND_PUSHNOTIFICATION_DATA_PROCEDURE
      );
 
    return await sequelizeConnection.query(`CALL ${sp_generatePush}`, {});

}
