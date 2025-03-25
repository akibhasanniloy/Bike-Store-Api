import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { bikeRoutes } from './app/modules/bike/bike.route';
const app: Application = express();
const port = 5000;

//parser
app.use(express.json());
app.use(cors());

//application routes
app.use('/api', bikeRoutes);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send('Hello from Book Store Api');
  // console.log('Hello');
};

app.get('/', getAController);

export default app;
