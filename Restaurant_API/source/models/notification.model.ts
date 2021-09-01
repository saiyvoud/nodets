import { BuildOptions, DataTypes, DATE, Model, ModelAttributes, Sequelize, UUID, UUIDV1 } from 'sequelize';
import { Service } from '../services/services';
import { BaseModel } from './base.model';
export interface NotificationAttributes extends BaseModel {
    notificationID:number;
    title:string;
    body:string;
    image:string;
    token:string;
    type:string;


}
export interface NotificationModel extends Model<NotificationAttributes>, NotificationAttributes {

}

export type NotificationStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): NotificationModel;
}
export const NotificationFactory = (name: string, sequelize: Sequelize): NotificationStatic => {
    const attributes: ModelAttributes<NotificationModel> = {
        notificationID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING, allowNull: false
        },
        body: {
            type: DataTypes.STRING, allowNull: false
        },
        image: {
            type: DataTypes.STRING, allowNull: false
        },
        type:{
            type: DataTypes.STRING, allowNull: false
        },
        token: {
            type: DataTypes.STRING, allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true
        }
    }
    let x = sequelize.define(name, attributes, 
        { tableName: name, freezeTableName: true, timestamps: true });
    return x;
}