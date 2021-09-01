import { NextFunction, Request, response, Response } from 'express';
import { CartEntity, OrderDetailEntity, OrderEntity } from '../models/database.entity';
import { OrderModel } from '../models/order.model';
import { OrderDetailModel } from '../models/orderdetail_model';
import { Service, TableName } from '../services/services';
export class OrderDetailController {
     ///<===== add Order ======>
    public static addOrderDetail(req: Request, res: Response) {
        const orderdetail = req.body as OrderDetailModel;
        if (Object.entries(orderdetail).length === 0) {
            res.send(Service.respon([], "Data is empty!", 0));     
        } else {
            CartEntity.findOne({ where: {cartID:orderdetail.cartID } }).then(async result1 => {
                if(result1){ 
                try {
                    OrderDetailEntity.create(orderdetail).then(result2 => {
                        res.send(Service.respon(result1, "completed order detail successfully", 1));
                        if(result2){
                            try {
                                 result1.isActive = false;
                                 result1.save();
                                res.send(Service.respon(result1, `order detail id: ${orderdetail.orderID} update status cart  successfully`, 1));
                            } catch (e) {
                                res.send(Service.respon([], "update status cart failed! " + e, 0));
                            }
                            // OrderDetailEntity.findOne({ where: {orderID:orderdetail.orderID } }).then(async result3 => {
   
                            // });
                            // const order = req.body as OrderModel;
                            // OrderEntity.create(order).then(result3 => {
                            //     res.send(Service.respon(result3, "completed order successfully", 1));
                            //     result3.orderID;
                            //      result1.save();
                            // });
                        }
                    }).catch(e => {
                        res.send(Service.respon([], "completed orderdetail failed! " + e, 0));
                    })
            
                } catch (e) {
                    console.log(e);
                    res.send(Service.respon([], "Error: " + e, 0));
                }
            }else{
                res.send(Service.respon([], "completed orderdetail failed! " , 0));
            }
            });
        
    }
    }
     ///<===== update Order  ======>
    public static updateOrder(req: Request, res: Response) {
        const orderdetail = req.body as OrderDetailModel;
        if (Object.entries(orderdetail).length === 0) {
            res.send(Service.respon([], 'Data is empty!', 0));
        } else {
            OrderDetailEntity.findOne({ where: {orderID:orderdetail.orderID, cartID: orderdetail.cartID,  } }).then(async result => {
                if (result) {
                    try {
                        Service.copyObject(orderdetail, result);
                        await result.save();
                        res.send(Service.respon(result, `order id: ${orderdetail.orderID} add order detail successfully`, 1));
                    } catch (e) {
                        res.send(Service.respon([], "add order detail failed! " + e, 0));
                    }
                }else{
                    res.send(Service.respon([], "add order detail failed! " , 0));
                }
            }).catch(e => {
                res.send(Service.respon([], "Error: " + e, 0));
            });
        }
    }
      ///<===== Delete Order ======>
  public static deleteOrder(req: Request, res: Response) {
    const order = req.body as OrderDetailModel;
  if (order.orderID) {
       const id: number = req.body.id;
      OrderDetailEntity.findOne({where: {orderID:id }}).then(async result => {
          if (result) {
              try {
                  let x = await result.destroy();
                  res.send(Service.respon(x, `order id: ${order.orderID} delete order detail successfully`, 1));
              } catch (e) {
                  res.send(Service.respon([], "Delete order detail failed!  " + e, 0));
              }
          } else {
              res.send(Service.respon([], `order detail id: ${order.orderID} is not exist!`, 0));
          }
      }).catch(e => {
          res.send(Service.respon([], "Error: " + e, 0));
      })
  } else {
      res.send(Service.respon([], 'order detail id is empty!', 0));
  }
}
 ///<===== Get Order ======>
public static getOrder(req: Request, res: Response) {
    const order = req.body as OrderDetailModel;
    if (order.cartID) { 
        try {
            OrderDetailEntity.findAll({ where: {cartID: order.cartID,isActive:order.isActive = true} }).then(result => {
                if (result) {
                    const data = Service.clone(result);
                    res.send(data);
                } else {
                    res.send(Service.respon([], "Sorry, no order detail info!", 0));
                }
            }).catch(e => {
                res.send(Service.respon([], "Error: " + e, 0));
            })
        } catch (e) {
            res.send(Service.respon([], "Error: " + e, 0));
        }
    } else {
        res.send(Service.respon([], 'order detail id is empty!', 0));
    }
}
}