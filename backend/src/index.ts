import express, { Request, Response, NextFunction } from 'express';
import dutyRoute from './controller/duty';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use('/duty', dutyRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
