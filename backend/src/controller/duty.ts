import { Router, Request, Response, NextFunction } from 'express';
import * as DutyService from '../service/duty';

const router = Router();

router.post('', async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('create duty', req.body);

    const { name } = req.body;
    if (!name) {
      return next(new Error('name is required'));
    }

    const data = await DutyService.createDuty(name);

    console.log('create duty success', data);
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.post('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, isDone } = req.body;

    if (!id) {
      return next(new Error('id is required'));
    }

    if (!name) {
      return next(new Error('name is required'));
    }

    const data = await DutyService.updateDuty(Number(id), name, isDone);

    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id) {
        return next(new Error('id is required'));
      }

      const data = await DutyService.deleteDuty(Number(id));

      res.send(data);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/list', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await DutyService.listDuties();

    res.send(data);
  } catch (error) {
    next(error);
  }
});

export default router;
