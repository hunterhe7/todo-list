import express, { Request, Response, NextFunction } from 'express';
import dutyRoute from './controller/duty';
import { HttpError } from './package/http_error';
import cors from 'cors';
import { z, ZodError } from 'zod';

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

  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message });
  }
  if (err instanceof z.ZodError) {
    return res.status(400).json({ error: err.errors });
  }

  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
