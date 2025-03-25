import express from 'express';
import { bikeControllers } from './bike.controller';

const router = express.Router();

//will call controller function
router.post('/products', bikeControllers.createBike);

//Get all products
router.get('/products', bikeControllers.getAllBikes);

//Get a single product
router.get('/products/:productId', bikeControllers.getASingleBike);

//update Bike data
router.put('/products/:productId', bikeControllers.updateASingleBike);

//delete Bike
router.delete('/products/:productId', bikeControllers.deleteABike);

// Place an order
router.post('/orders', bikeControllers.placeOrder);

//calculate
router.get('/orders/revenue', bikeControllers.getRevenue);

export const bikeRoutes = router;
