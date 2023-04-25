import { NextFunction, Request, response, Response } from 'express';
import { Sequelize, Op } from 'sequelize';
import { CartModel } from '../models/cart_model';
import { CartEntity, OrderDetailEntity, ProductEntity, UserEntity } from '../models/database.entity';
import { ProductModel } from '../models/product_model';
import { Service, TableName } from '../services/services';

export class CartDetailController {
    ///<===== add Product ======>
    public static addToCart(req: Request, res: Response) {
        const cart = req.body as CartModel;
        if (Object.entries(cart).length === 0) {
            res.send(Service.respon([], 'Data is empty!', 0));
        } else {
            CartEntity.findOne({ where: { productID: cart.productID } }).then(async (result) => {
                if (result) {
                    try {
                        Service.copyObject(cart, result);
                        await result.save();
                        res.send(Service.respon(result, `cart id: ${cart.cartID} add old successfully`, 1));
                    } catch (e) {
                        res.send(Service.respon([], 'add to old cart failed! ' + e, 0));
                    }
                } else {
                    ProductEntity.findOne({ where: { productID: cart.productID } }).then(async (result2) => {
                        if (result2) {
                            try {
                                CartEntity.create(cart)
                                    .then((result3) => {
                                        res.send(Service.respon(result3, 'Add to cart successfully', 1));
                                    })
                                    .catch((e) => {
                                        res.send(Service.respon([], 'Add to cart failed! ' + e, 0));
                                    });
                            } catch (e) {
                                console.log(e);
                                res.send(Service.respon([], 'Error: ' + e, 0));
                            }
                        } else {
                            res.send(Service.respon([], 'productID no have! ', 0));
                        }
                    });
                }
            });
        }
    }
    ///<===== plusAmount Product ======>
    public static plusAmount(req: Request, res: Response) {
        const cart = req.body as CartModel;
        if (Object.entries(cart).length === 0) {
            res.send(Service.respon([], 'Data is empty!', 0));
        } else {
            CartEntity.findOne({ where: { cartID: cart.cartID, userID: cart.userID } })
                .then(async (result) => {
                    if (result) {
                        try {
                            Service.copyObject(cart, result);
                            await result.save();
                            res.send(Service.respon(result, `cart id: ${cart.cartID} update successfully`, 1));
                        } catch (e) {
                            res.send(Service.respon([], 'update cart failed! ' + e, 0));
                        }
                    }
                })
                .catch((e) => {
                    res.send(Service.respon([], 'Error: ' + e, 0));
                });
        }
    }
    ///<===== removeAmount Product ======>
    public static removeAmount(eq: Request, res: Response) {}
    //<====== update Cart ======>
    public static updateCart(req: Request, res: Response) {
        const cart = req.body as CartModel;
        if (Object.entries(cart).length === 0) {
            res.send(Service.respon([], 'Data is empty!', 0));
        } else {
            CartEntity.findOne({ where: { cartID: cart.cartID, userID: cart.userID } })
                .then(async (result) => {
                    if (result) {
                        try {
                            Service.copyObject(cart, result);
                            await result.save();
                            res.send(Service.respon(result, `cart id: ${cart.cartID} update successfully`, 1));
                        } catch (e) {
                            res.send(Service.respon([], 'update cart failed! ' + e, 0));
                        }
                    }
                })
                .catch((e) => {
                    res.send(Service.respon([], 'Error: ' + e, 0));
                });
        }
    }
    ///<===== Delete Cart ======>
    public static deleteCart(req: Request, res: Response) {
        const cart = req.body as CartModel;
        if (cart.cartID) {
            // let id: number = cart.id;
            CartEntity.findOne({ where: { cartID: cart.cartID, userID: cart.userID } })
                .then(async (result) => {
                    if (result) {
                        try {
                            let x = await result.destroy();
                            res.send(Service.respon(x, `cart id: ${cart.cartID} delete successfully`, 1));
                        } catch (e) {
                            res.send(Service.respon([], 'Delete cart failed!  ' + e, 0));
                        }
                    } else {
                        res.send(Service.respon([], `cart id: ${cart.cartID} is not exist!`, 0));
                    }
                })
                .catch((e) => {
                    res.send(Service.respon([], 'Error: ' + e, 0));
                });
        } else {
            res.send(Service.respon([], 'cart id is empty!', 0));
        }
    }
    ///<===== Get Cart ======>
    public static getCart(req: Request, res: Response) {
        const cart = req.body as CartModel;
        if (cart.userID) {
            // const id: number = req.body.id;

            try {
                CartEntity.findAll({ where: { userID: cart.userID } })
                    .then((result) => {
                        if (result) {
                            const data = Service.clone(result);
                            res.send(data);
                        } else {
                            res.send(Service.respon([], 'Sorry, no cart info!', 0));
                        }
                    })
                    .catch((e) => {
                        res.send(Service.respon([], 'Error: ' + e, 0));
                    });
            } catch (e) {
                res.send(Service.respon([], 'Error: ' + e, 0));
            }
        } else {
            res.send(Service.respon([], 'cart id is empty!', 0));
        }
    }
    ///<===== join multi table  ======>
    public static getlistCart(req: Request, res: Response) {
        const cart = req.body as CartModel;
        if (cart.cartID) {
            // CartEntity.belongsToMany(ProductEntity, { through: 'productID', });
            // ProductEntity.belongsToMany(CartEntity, { through: 'productID' });
            // UserEntity.belongsToMany(CartEntity,{through: 'userID'});
            try {
                CartEntity.findAll({
                    include: [
                        {
                            model: ProductEntity,
                            attributes: ['productID']
                        }
                    ],
                    where: {
                        id: cart.cartID
                    }
                }).then((result) => {
                    console.log('done', result);
                });
            } catch (e) {
                res.send(Service.respon([], 'cart id Error!' + e, 0));
            }
        } else {
            res.send(Service.respon([], 'cart id is empty!', 0));
        }
    }
}
