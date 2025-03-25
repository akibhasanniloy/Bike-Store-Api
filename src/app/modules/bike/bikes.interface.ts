import mongoose, { Document, Schema, model, connect } from 'mongoose';

type BikeCategory = 'Mountain' | 'Road' | 'Hybrid' | 'Electric';

export type bike = {
  name: string;
  brand: string;
  price: number;
  category: BikeCategory;
  description: string;
  quantity: number;
  inStock: boolean;
};

export type order = {
  email: string;
  product: mongoose.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
};
