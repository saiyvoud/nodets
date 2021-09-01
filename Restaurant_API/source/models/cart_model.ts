import { BuildOptions, DataTypes, DATE, Model, ModelAttributes, Sequelize, UUID, UUIDV1 } from 'sequelize';
import { BaseModel } from './base.model';
import { ProductModel } from './product_model';

export interface CartAttributes extends BaseModel {
    cartID:number;
    productID:number;
    amount: number;
    userID:number;
}
export interface CartModel extends Model<CartAttributes>, CartAttributes {
    belongsToMany(product: ProductModel, arg1: { through: string; });

}

export type CartStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): CartModel;
}
export const CartFactory = (name: string, sequelize: Sequelize): CartStatic => {
    const attributes: ModelAttributes<CartModel> = {
        cartID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
            allowNull: false
        },
        productID: {
            type: DataTypes.INTEGER, allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER, allowNull: false
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