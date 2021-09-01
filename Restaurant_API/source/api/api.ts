import { Request, Response, Application, NextFunction } from 'express';
import express from 'express';
import { UserConroller } from '../controllers/user.controller';
import { AuthorizeController } from '../controllers/authorize.controller';
import { CategoryController } from '../controllers/category.controller';
import { ProductController } from '../controllers/product_controller';
import { CartDetailController } from '../controllers/cart_controller';
import { OrderDetailController } from '../controllers/orderdetail_controller';
import { LocationController } from '../controllers/location_controller';
import { NotificationController } from '../controllers/notification.controller';

const app: Application = express();

//<=== Login ===>
app.post('/login', AuthorizeController.logIn);

//<=== User ===>
app.post('/addUser', UserConroller.addUser);
app.post('/activeUser', AuthorizeController.checkAuthorize, UserConroller.activeUser);
app.post('/updateUser', AuthorizeController.checkAuthorize, UserConroller.updateUser);
app.post('/changePassword', AuthorizeController.checkAuthorize, UserConroller.changePassword);
app.post('/resetPassword', AuthorizeController.checkAuthorize, UserConroller.resetPassword);
app.post('/deleteUser', AuthorizeController.checkAuthorize, UserConroller.deleteUser);
app.post('/userListAll', AuthorizeController.checkAuthorize, UserConroller.userListAll);
app.post('/userListPage', AuthorizeController.checkAuthorize, UserConroller.userListPage);
app.post('/getUser', AuthorizeController.checkAuthorize, UserConroller.getUser);
app.post('/userListBetweenDate', AuthorizeController.checkAuthorize, UserConroller.userListBetweenDate);

//<=== Category ===>
app.post('/addCategory', AuthorizeController.checkAuthorize, AuthorizeController.checkUUID, CategoryController.addCategory)
app.post('/activeCategory', AuthorizeController.checkAuthorize, AuthorizeController.checkUUID, CategoryController.activeCategory)
app.post('/updateCategory', AuthorizeController.checkAuthorize, AuthorizeController.checkUUID, CategoryController.updateCategory)
app.post('/deleteCategory', AuthorizeController.checkAuthorize, AuthorizeController.checkUUID, CategoryController.deleteCategory)
app.post('/categoryListAll', AuthorizeController.checkAuthorize, AuthorizeController.checkUUID, CategoryController.categoryListAll)
app.post('/getCategory', AuthorizeController.checkAuthorize, AuthorizeController.checkUUID, CategoryController.getCategory)
app.post('/categoryListPage', AuthorizeController.checkAuthorize, AuthorizeController.checkUUID, CategoryController.categoryListPage)

//<=== Product ===>
app.post('/addProduct',ProductController.addProduct);
app.post('/updateProduct',ProductController.updateProduct);
app.post('/deleteProduct',ProductController.deleteProduct);
app.post('/getProduct',ProductController.getProduct);

//<=== Cart ===>
app.post('/addToCart',AuthorizeController.checkAuthorize,CartDetailController.addToCart);
app.post('/plusAmount',AuthorizeController.checkAuthorize,CartDetailController.plusAmount);
app.post('/deleteCart',AuthorizeController.checkAuthorize,CartDetailController.deleteCart);
app.post('/updateCart',AuthorizeController.checkAuthorize,CartDetailController.updateCart);
app.post('/getCart',AuthorizeController.checkAuthorize,CartDetailController.getCart);
app.post('/getlistCart',AuthorizeController.checkAuthorize,CartDetailController.getlistCart);

//<=== Location ===>
app.post('/addLocation',AuthorizeController.checkAuthorize,LocationController.addLocation);
app.post('/updateLocation',AuthorizeController.checkAuthorize,LocationController.updateLocation);
app.post('/deleteLocation',AuthorizeController.checkAuthorize,LocationController.deleteLocation);
app.post('/getLocation',AuthorizeController.checkAuthorize,LocationController.getLocation);

//<=== Notification ===>
app.post('/addNotification',AuthorizeController.checkAuthorize,NotificationController.addNotification);
app.post('/updateNotification',NotificationController.updateNotificaf);
app.post('/deleteNotification',NotificationController.deleteNotification);
app.post('/getNotification',NotificationController.getNotification);

//<=== Order ===>
app.post('/addOrderDetail',AuthorizeController.checkAuthorize,OrderDetailController.addOrderDetail);
app.post('/updateOrderDetail',AuthorizeController.checkAuthorize,OrderDetailController.updateOrder);
app.post('/deleteOrderDetail',AuthorizeController.checkAuthorize,OrderDetailController.deleteOrder);
app.post('/getOrderDetail',AuthorizeController.checkAuthorize,OrderDetailController.getOrder);

export = app;