import { BuildOptions, DataTypes, DATE, Model, ModelAttributes, Sequelize, UUID, UUIDV1 } from 'sequelize';
import { Service } from '../services/services';
import { BaseModel } from './base.model';

export interface OrderDetailAttributes extends BaseModel {
    orderdetailID:number;
    cartID:number;
    locationID: number;
    totalprice: string;
    typePayment:string;
    orderID:number;
}
export interface OrderDetailModel extends Model<OrderDetailAttributes>, OrderDetailAttributes {

}

export type OrderDetailStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): OrderDetailModel;
}
export const OrderDetailFactory = (name: string, sequelize: Sequelize): OrderDetailStatic => {
    const attributes: ModelAttributes<OrderDetailModel> = {
        orderdetailID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
            allowNull: false
        },
        cartID: {
            type: DataTypes.INTEGER, allowNull: false
        },
      
        typePayment: {
            type: DataTypes.STRING, allowNull: false
        },
        totalprice: {
            type: DataTypes.STRING, allowNull: false
        },
        locationID: {
            type: DataTypes.INTEGER, allowNull: false
        },
        orderID: {
            type: DataTypes.INTEGER, allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true
        }
    }
    let x = sequelize.define(name, attributes, 
        { tableName: name, freezeTableName: true, timestamps: true });
    return x;
}