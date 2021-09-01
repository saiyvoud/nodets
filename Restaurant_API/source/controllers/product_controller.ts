import { NextFunction, Request, response, Response } from 'express';
import { Sequelize, Op } from "sequelize";
import { Service, TableName } from '../services/services';
import { DBconnection, ProductEntity } from '../models/database.entity';
import { ProductModel } from '../models/product_model';
export class ProductController {
    ///<===== add Product ======>
    public static addProduct(req: Request, res: Response) {
        const product = req.body as ProductModel;
        if (Object.entries(product).length === 0) {
            res.send(Service.respon([], "Data is empty!", 0));
        } else {
            ProductEntity.findOne({ where: { name: product.name } }).then(result => {
                if (result) {
                    res.send(Service.respon([], `productname: ${product.name} is already exist!`, 0));
                } else {
                    try {

                        ProductEntity.create(product).then(result => {
                            res.send(Service.respon(result, "Add product successfully", 1));
                        }).catch(e => {
                            res.send(Service.respon([], "Add product failed! " + e, 0));
                        })
                    } catch (e) {
                        console.log(e);
                        res.send(Service.respon([], "Error: " + e, 0));
                    }

                }
            }).catch(e => {
                res.send(Service.respon([], "Error: " + e, 0));
            })
        }
    }
    ///<===== update Product ======>
    public static updateProduct(req: Request, res: Response) {
        const product = req.body as ProductModel;
        if (Object.entries(product).length === 0) {
            res.send(Service.respon([], 'Data is empty!', 0));
        } else {
            if (product.productID) {
                ProductEntity.findByPk(product.productID).then(async result => {
                    if (result) {

                        try {
                            Service.copyObject(product, result);
                            await result.save();
                            res.send(Service.respon(result, `product id: ${product.productID} update successfully`, 1));
                        } catch (e) {
                            res.send(Service.respon([], "Update product failed! " + e, 0));
                        }

                    } else {
                        res.send(Service.respon([], `product id: ${product.productID} is not exist!`, 0));
                    }
                }).catch(e => {
                    res.send(Service.respon([], "Error: " + e, 0));
                })
            } else {
                res.send(Service.respon([], 'product id is empty!', 0));
            }
        }
    }
    ///<===== Delete Product ======>
    public static deleteProduct(req: Request, res: Response) {
        if (req.body.id) {
            let id: number = req.body.id;
            ProductEntity.findByPk(id).then(async result => {
                if (result) {
                    try {
                        let x = await result.destroy();
                        res.send(Service.respon(x, `product id: ${id} delete successfully`, 1));
                    } catch (e) {
                        res.send(Service.respon([], "Delete product failed!  " + e, 0));
                    }
                } else {
                    res.send(Service.respon([], `product id: ${id} is not exist!`, 0));
                }
            }).catch(e => {
                res.send(Service.respon([], "Error: " + e, 0));
            })
        } else {
            res.send(Service.respon([], 'product id is empty!', 0));
        }
    }
    ///<=====  get Product ======>
    public static getProduct(req: Request, res: Response) {
        if (req.body.id) {
            const id: number = req.body.id;
            try {
                ProductEntity.findOne({ where: { productID: id } }).then(result => {
                    if (result) {
                        const data = Service.clone(result);
                        delete data.password;
                        res.send(data);
                    } else {
                        res.send(Service.respon([], "Sorry, no useraaa info!", 0));
                    }
                }).catch(e => {
                    res.send(Service.respon([], "Error: " + e, 0));
                })
            } catch (e) {
                res.send(Service.respon([], "Error: " + e, 0));
            }
        } else {
            res.send(Service.respon([], 'Product id is empty!', 0));
        }
    }
}