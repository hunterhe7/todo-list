import { Router, Request, Response, NextFunction } from 'express';
import * as DutyService from '../service/duty';
import { HttpError } from '../package/http_error';
import { validateRequest } from '../middleware/validateRequest';
import {
  CreateDutyRequestSchema,
  UpdateDutyRequestSchema,
  DeleteDutyRequestSchema,
  type CreateDutyResponse,
  type UpdateDutyResponse,
  type DeleteDutyResponse,
  type ListDutiesResponse,
} from '../schema/duty.schema';

const router: Router = Router();

// Create duty
router.post(
  '',
  validateRequest(CreateDutyRequestSchema),
  async (req: Request, res: Response<CreateDutyResponse>, next: NextFunction) => {
    try {
      const { name } = req.body;
      const data = await DutyService.createDuty(name);
      res.json([data]);
    } catch (error) {
      next(error instanceof HttpError ? error : new HttpError(500, 'Failed to create duty'));
    }
  }
);

// Update duty
router.post(
  '/:id',
  validateRequest(UpdateDutyRequestSchema),
  async (req: Request, res: Response<UpdateDutyResponse>, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { name, is_done } = req.body;
      const data = await DutyService.updateDuty(Number(id), name, is_done);
      res.json([data]);
    } catch (error) {
      next(error instanceof HttpError ? error : new HttpError(500, 'Failed to update duty'));
    }
  }
);

// Delete duty
router.delete(
  '/:id',
  validateRequest(DeleteDutyRequestSchema),
  async (req: Request, res: Response<DeleteDutyResponse>, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = await DutyService.deleteDuty(Number(id));
      res.json([data]);
    } catch (error) {
      next(error instanceof HttpError ? error : new HttpError(500, 'Failed to delete duty'));
    }
  }
);

// List duties
router.get('/list', async (req: Request, res: Response<ListDutiesResponse>, next: NextFunction) => {
  try {
    const data = await DutyService.listDuties();
    res.json(data);
  } catch (error) {
    next(error instanceof HttpError ? error : new HttpError(500, 'Failed to fetch duties'));
  }
});

export default router;
