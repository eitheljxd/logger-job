import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface TicketsAttributes {
    row_ticket: number;
    ti_description: string;
    ti_code: string;
    ti_location_start: Date;
    ti_location_end: Date;
    state: boolean,
}
export interface TicketInput extends Optional<TicketsAttributes, 'row_ticket' | 'ti_code'> { }
export interface TicketOutput extends Required<TicketsAttributes> { }


class Ticket extends Model<TicketsAttributes, TicketInput> implements TicketsAttributes {
    public row_ticket!: number
    public ti_description!: string
    public ti_code!: string
    public ti_location_start!: Date
    public ti_location_end!: Date
    public state!: boolean
}

Ticket.init({
    row_ticket: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ti_description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ti_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    ti_location_start: {
        type: DataTypes.DATE
    },
    ti_location_end: {
        type: DataTypes.DATE
    },
    state: {
        type: DataTypes.BOOLEAN
    },
}, {
    tableName: 'tickets',
    timestamps: false,
    sequelize: sequelizeConnection,
    paranoid: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false
})

export default Ticket