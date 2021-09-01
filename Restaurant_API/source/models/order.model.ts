import { BuildOptions, DataTypes, DATE, Model, ModelAttributes, Sequelize, UUID, UUIDV1 } from 'sequelize';
import { Service } from '../services/services';
import { BaseModel } from './base.model';

export interface OrderAttributes extends BaseModel {
    orderID:number;
    cartID:number;
    locationID: number;
    totalprice: string;
    typePayment:string;
   
}
export interface OrderModel extends Model<OrderAttributes>, OrderAttributes {

}

export type OrderStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): OrderModel;
}
export const OrderFactory = (name: string, sequelize: Sequelize): OrderStatic => {
    const attributes: ModelAttributes<OrderModel> = {
        orderID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true
        }
    }
    let x = sequelize.define(name, attributes, 
        { tableName: name, freezeTableName: true, timestamps: true });
    return x;
}