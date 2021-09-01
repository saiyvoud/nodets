import { BuildOptions, DataTypes, DATE, Model, ModelAttributes, Sequelize, UUID, UUIDV1 } from 'sequelize';
import { Service } from '../services/services';
import { BaseModel } from './base.model';
import { CartModel } from './cart_model';
export interface ProductAttributes extends BaseModel {
    productID:number;
    categoryID: number;
    name: string;
    type: string;
    price:string;
    description:string;
    image:string;
    amonut:Number;
    
}
export interface ProductModel extends Model<ProductAttributes>, ProductAttributes {
    belongsToMany(cart: CartModel, arg1: { through: string; });

}

export type ProductStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): ProductModel;
}
export const ProductFactory = (name: string, sequelize: Sequelize): ProductStatic => {
    const attributes: ModelAttributes<ProductModel> = {
        productID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
            allowNull: false
        },
        categoryID: {
            type: DataTypes.INTEGER, allowNull: false
        },
        name: {
            type: DataTypes.STRING, allowNull: false
        },
        type: {
            type: DataTypes.STRING, allowNull: false
        },
        price: {
            type: DataTypes.STRING, allowNull: false
        },
        description: {
            type: DataTypes.STRING, allowNull: true
        },
        image: {
            type: DataTypes.STRING, allowNull: false
        },
        amount: {
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