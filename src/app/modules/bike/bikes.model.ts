import mongoose, { Schema, model, connect } from 'mongoose';
import { bike, order } from './bikes.interface';

const bikeSchema = new Schema<bike>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters'],
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be positive'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'Electric'],
        message: 'Please select correct category for product',
      },
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const orderSchema = new Schema<order>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    product: {
      // type: mongoose.Schema.Types.ObjectId,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product ID is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Total price must be positive'],
    },
  },
  { timestamps: true },
);

export const BikeModel = model<bike>('Bike', bikeSchema);
export const OrderModel = model<order>('Order', orderSchema);
