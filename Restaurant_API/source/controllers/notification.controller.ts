import { NextFunction, Request, response, Response } from 'express';
import { Sequelize, Op } from "sequelize";
import { not } from 'sequelize/types/lib/operators';
import { NotificationEntity } from '../models/database.entity';
import { NotificationModel } from '../models/notification.model';
import { Service } from '../services/services';
export class NotificationController {
    //<===== add Location ======>
    public static addNotification(req: Request, res: Response) {
        const notification = req.body as NotificationModel;
        if (Object.entries(notification).length === 0) {
            res.send(Service.respon([], "Data is empty!", 0));
        } else {
            try {
                NotificationEntity.create(notification).then(result => {
                    res.send(Service.respon(result, "Add product successfully", 1));
                }).catch(e => {
                    res.send(Service.respon([], "Add product failed! " + e, 0));
                })
            } catch (e) {
                console.log(e);
                res.send(Service.respon([], "Error: " + e, 0));
            }
        }
    }
    //<===== update Location ======>
    public static updateNotificaf(req: Request, res: Response) {
        const notification = req.body as NotificationModel
        if (Object.entries(notification).length === 0) {
            res.send(Service.respon([], 'Data is empty!', 0));
        } else {
            NotificationEntity.findOne({ where: { token: notification.token } }).then(async result => {
                if (result) {
                    try {
                        Service.copyObject(notification, result);
                        await result.save();
                        res.send(Service.respon(result, `notification id: ${notification.notificationID} update successfully`, 1));
                    } catch (e) {
                        res.send(Service.respon([], "update notification failed! " + e, 0));
                    }
                }
            }).catch(e => {
                res.send(Service.respon([], "Error: " + e, 0));
            });
        }
}
//<===== Delete Notification ======>
public static deleteNotification(req: Request, res: Response) {
    const notification = req.body as NotificationModel;
    if (notification.notificationID) {
        let id: number = notification.notificationID;
        NotificationEntity.findOne({ where: { notificationID: notification.id} }).then(async result => {
            if (result) {
                try {
                    let x = await result.destroy();
                    res.send(Service.respon(x, `notification id: ${notification.notificationID} delete successfully`, 1));
                } catch (e) {
                    res.send(Service.respon([], "Delete notification failed!  " + e, 0));
                }
            } else {
                res.send(Service.respon([], `notification id: ${notification.notificationID} is not exist!`, 0));
            }
        }).catch(e => {
            res.send(Service.respon([], "Error: " + e, 0));
        })
    } else {
        res.send(Service.respon([], 'notification id is empty!', 0));
    }
}
//<===== get Notification ======>
public static getNotification(req: Request, res: Response) {
    const notification = req.body as NotificationModel;
    if (notification.notificationID) {
        try {
            NotificationEntity.findOne({ where: { notificationID: notification.notificationID } }).then(result => {
                if (result) {
                    const data = Service.clone(result);
                    res.send(data);
                } else {
                    res.send(Service.respon([], "Sorry, no notification info!", 0));
                }
            }).catch(e => {
                res.send(Service.respon([], "Error: " + e, 0));
            })
        } catch (e) {
            res.send(Service.respon([], "Error: " + e, 0));
        }
    } else {
        res.send(Service.respon([], 'notication id is empty!', 0));
    }
}
}