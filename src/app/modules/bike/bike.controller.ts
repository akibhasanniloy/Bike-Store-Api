import { bike } from './bikes.interface';
import { Request, Response } from 'express';
import { bikeServices } from './bike.service';
import { equal } from 'assert';

const createBike = async (req: Request, res: Response) => {
  try {
    const bikeData = req.body;
    const result = await bikeServices.createBikeIntoDB(bikeData);
    res.status(201).json({
      success: true,
      message: 'Bike created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllBikes = async (req: Request, res: Response) => {
  try {
    const result = await bikeServices.getAllBikesFromDB();
    res.status(200).json({
      success: true,
      message: 'Bikes retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getASingleBike = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await bikeServices.getASingleBikeFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Bike retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const updateASingleBike = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedData = req.body;

    const result = await bikeServices.updateBikeIntoDB(productId, updatedData);
    res.status(200).json({
      success: true,
      message: 'Bike updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const deleteABike = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await bikeServices.deleteBikeFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Bike deleted successfully',
      data: {},
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const placeOrder = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity, totalPrice } = req.body;
    const bike = await bikeServices.getASingleBikeFromDB(product);
    if (!bike) {
      return res.status(404).json({
        success: false,
        message: 'Bike not found',
      });
    }

    if (bike.quantity < quantity) {
      return res
        .status(400)
        .json({ status: false, message: 'Insufficient stock' });
    }

    const order = await bikeServices.createOrder({
      email,
      product,
      quantity,
      totalPrice,
    });

    const updatedQuantity = bike.quantity - quantity;
    await bikeServices.updateBikeIntoDB(product, {
      quantity: updatedQuantity,
      inStock: updatedQuantity > 0,
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getRevenue = async (req: Request, res: Response) => {
  try {
    const result = await bikeServices.calculateRevenue();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: {
        totalRevenue: result.length ? result[0].totalRevenue : 0,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const bikeControllers = {
  createBike,
  getAllBikes,
  getASingleBike,
  updateASingleBike,
  deleteABike,
  placeOrder,
  getRevenue,
};
