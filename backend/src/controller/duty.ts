import { Router, Request, Response, NextFunction } from 'express';
import * as DutyService from '../service/duty';
import { HttpError } from '../package/http_error';

const router: Router = Router();

router.post('', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('create duty req body', req.body);

    const { name } = req.body;
    if (!name) {
      return next(new HttpError(400, 'name is required'));
    }

    const data = await DutyService.createDuty(name);
    console.log('create duty success', data);

    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.post('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('update duty req body', req.body);

    const { id } = req.params;
    const { name, is_done } = req.body;

    if (!id) {
      return next(new HttpError(400, 'id is required'));
    }

    if (!name) {
      return next(new HttpError(400, 'name is required'));
    }

    const data = await DutyService.updateDuty(Number(id), name, is_done);
    console.log('update duty success', data);

    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new HttpError(400, 'id is required'));
    }

    const data = await DutyService.deleteDuty(Number(id));
    console.log('delete duty success', data);

    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.get('/list', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await DutyService.listDuties();
    console.log('list duty success', data);

    res.send(data);
  } catch (error) {
    next(error);
  }
});

export default router;
