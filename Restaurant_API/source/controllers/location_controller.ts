import { NextFunction, Request, response, Response } from 'express';
import { Sequelize, Op } from "sequelize";
import { LocationEntity } from '../models/database.entity';
import { LocationModel } from '../models/location_model';
import { Service } from '../services/services';
export class LocationController {
    ///<===== add Location ======>
    public static addLocation(req: Request, res: Response) {
        const location = req.body as LocationModel;
        if (Object.entries(location).length === 0) {
            res.send(Service.respon([], "Data is empty!", 0));
        } else {
            try {
                LocationEntity.create(location).then(result => {
                    res.send(Service.respon(result, "Add location successfully", 1));
                }).catch(e => {
                    res.send(Service.respon([], "Add location failed! " + e, 0));
                })
            } catch (e) {
                console.log(e);
                res.send(Service.respon([], "Error: " + e, 0));
            }
        }
    }
    ///<===== update Location ======>
    public static updateLocation(req: Request, res: Response) {
        const location = req.body as LocationModel;
        if (Object.entries(location).length === 0) {
            res.send(Service.respon([], 'Data is empty!', 0));
        } else {
            LocationEntity.findOne({ where: {locationID:location.locationID,  userID: location.userID } }).then(async result => {
                if (result) {
                    try {
                        Service.copyObject(location, result);
                        await result.save();
                        res.send(Service.respon(result, `location id: ${location.locationID} add location successfully`, 1));
                    } catch (e) {
                        res.send(Service.respon([], "add location failed! " + e, 0));
                    }
                }else{
                    res.send(Service.respon([], "add location failed! " , 0));
                }
            }).catch(e => {
                res.send(Service.respon([], "Error: " + e, 0));
            });
        }
    }
     ///<===== Delete Location ======>
  public static deleteLocation(req: Request, res: Response) {
    const location = req.body as LocationModel;
  if (location.locationID) {
       const id: number = req.body.id;
      LocationEntity.findOne({where: {locationID:id,userID:location.userID }}).then(async result => {
          if (result) {
              try {
                  let x = await result.destroy();
                  res.send(Service.respon(x, `location id: ${location.locationID} delete location successfully`, 1));
              } catch (e) {
                  res.send(Service.respon([], "Delete location failed!  " + e, 0));
              }
          } else {
              res.send(Service.respon([], `location id: ${location.locationID} is not exist!`, 0));
          }
      }).catch(e => {
          res.send(Service.respon([], "Error: " + e, 0));
      })
  } else {
      res.send(Service.respon([], 'location id is empty!', 0));
  }
}
///<===== Get Location ======>
public static getLocation(req: Request, res: Response) {
    const location = req.body as LocationModel;
    if (location.userID) { 
        try {
            LocationEntity.findAll({ where: {userID: location.userID,} }).then(result => {
                if (result) {
                    const data = Service.clone(result);
                    res.send(data);
                } else {
                    res.send(Service.respon([], "Sorry, no location info!", 0));
                }
            }).catch(e => {
                res.send(Service.respon([], "Error: " + e, 0));
            })
        } catch (e) {
            res.send(Service.respon([], "Error: " + e, 0));
        }
    } else {
        res.send(Service.respon([], 'location id is empty!', 0));
    }
}
}
