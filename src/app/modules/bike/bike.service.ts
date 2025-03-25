import { bike, order } from './bikes.interface';
import { BikeModel, OrderModel } from './bikes.model';
import mongoose from 'mongoose';

//create bikes
const createBikeIntoDB = async (bike: bike) => {
  const result = await BikeModel.create(bike);
  return result;
};

//Get all bikes
const getAllBikesFromDB = async () => {
  const result = await BikeModel.find();
  return result;
};

//Get a single bike
const getASingleBikeFromDB = async (id: string) => {
  const result = await BikeModel.findOne({ _id: id });
  return result;
};

//Update a single bike
const updateBikeIntoDB = async (id: string, updateData: Partial<bike>) => {
  const result = await BikeModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return result;
};

//Delete a bike
const deleteBikeFromDB = async (id: string) => {
  const result = await BikeModel.findByIdAndDelete({ _id: id });
  return result;
};

const createOrder = async (orderData: order) => {
  const order = new OrderModel(orderData);
  return await order.save();
};

const calculateRevenue = async () => {
  return await OrderModel.aggregate([
    {
      $lookup: {
        from: 'bikes',
        localField: 'product',
        foreignField: '_id',
        as: 'bikeDetails',
      },
    },
    { $unwind: '$bikeDetails' },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: { $multiply: ['$bikeDetails.price', '$quantity'] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);
};

export const bikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  getASingleBikeFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
  createOrder,
  calculateRevenue,
};
