

import { DataPushNotification } from '../../models/data.model'
import sequelizeConnection from '../config'
import Ticket, { TicketInput, TicketOutput } from '../models/tickets'

export const getAll = async (filters?: TicketInput): Promise<DataPushNotification[]> => {
  // const { sp_generatePush } = await getSecrets(
  //   "prod/PushNotificationPdmLogger"
  // );
  const sp_generatePush = "sp_process_pushnotifications_data()";
  return await sequelizeConnection.query(`CALL ${sp_generatePush}`, {});

}
