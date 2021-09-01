import { BuildOptions, DataTypes, DATE, Model, ModelAttributes, Sequelize, UUID, UUIDV1 } from 'sequelize';
import { Service } from '../services/services';
import { BaseModel } from './base.model';
export interface LocationAttributes extends BaseModel {
    locationID:number;
    name:string;
    type:string;
    call:string;
    detail:string;
    lat:string;
    lng:string;
    userID:number;
}
export interface LocationModel extends Model<LocationAttributes>, LocationAttributes {

}

export type LocationStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): LocationModel;
}
export const LocationFactory = (name: string, sequelize: Sequelize): LocationStatic => {
    const attributes: ModelAttributes<LocationModel> = {
        locationID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING, allowNull: false
        },
        type: {
            type: DataTypes.STRING, allowNull: false
        },
        call: {
            type: DataTypes.STRING, allowNull: false
        },
        detail:{
            type: DataTypes.STRING, allowNull: false
        },
        lat:{
            type: DataTypes.STRING, allowNull: false
        },
        lng:{
            type: DataTypes.STRING, allowNull: false
        },
        userID: {
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