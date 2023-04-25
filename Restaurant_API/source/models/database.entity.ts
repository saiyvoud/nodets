import { Sequelize } from "sequelize";
import { DB } from "../config/config";
import { TableName } from "../services/services";
import { CartFactory } from "./cart_model";
import { LocationFactory } from "./location_model";
import { NotificationFactory } from "./notification.model";
import { OrderFactory } from "./order.model";
import { OrderDetailFactory } from "./orderdetail_model";
import { ProductFactory } from "./product_model";
import { UserFactory } from "./user.model";


export const DBconnection = new Sequelize(DB.dbname, DB.dbuser, DB.dbpass, { host: DB.dbhost, dialect: DB.dbdialect, timezone: DB.timezone, logging: false });

export const UserEntity = UserFactory(TableName.users, DBconnection);
export const ProductEntity = ProductFactory(TableName.product, DBconnection);
export const CartEntity = CartFactory(TableName.cart, DBconnection);
export const LocationEntity = LocationFactory(TableName.location, DBconnection);
export const OrderDetailEntity = OrderDetailFactory(TableName.orderDetail, DBconnection);
export const OrderEntity = OrderFactory(TableName.order, DBconnection);
export const NotificationEntity = NotificationFactory(TableName.notification, DBconnection);

export function initDB(): Promise<Sequelize> {
    return new Promise<Sequelize>(async (resolve, rejects) => {
        try {
            await UserEntity.sync();
            await ProductEntity.sync();
            await CartEntity.sync();
            await LocationEntity.sync();
            // await OrderDetailEntity.sync();
            await NotificationEntity.sync();
            // await ProductEntity.sync({ alter: true });
            // await CartEntity.sync({ alter: true });
            await OrderEntity.sync({ alter: true });
           
            //  await OrderDetailEntity.sync({ force: true });
            //    await CartEntity.sync({ force: true });
            //   await NotificationEntity.sync({ force: true });

            resolve(DBconnection);
        } catch (e) {
            rejects(e)
        }
    });
};

initDB();