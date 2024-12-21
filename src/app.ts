import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173'],
  }),
);

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running 🏃‍♀️‍➡️');
});
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
