import { Router, Request, Response } from 'express';
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
  async (req: Request, res: Response<CreateDutyResponse>) => {
    try {
      const { name } = req.body;
      const data = await DutyService.createDuty(name);
      res.json([data]);
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError(500, 'Failed to create duty');
    }
  }
);

// Update duty
router.post(
  '/:id',
  validateRequest(UpdateDutyRequestSchema),
  async (req: Request, res: Response<UpdateDutyResponse>) => {
    try {
      const { id } = req.params;
      const { name, is_done } = req.body;
      const data = await DutyService.updateDuty(Number(id), name, is_done);
      res.json([data]);
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError(500, 'Failed to update duty');
    }
  }
);

// Delete duty
router.delete(
  '/:id',
  validateRequest(DeleteDutyRequestSchema),
  async (req: Request, res: Response<DeleteDutyResponse>) => {
    try {
      const { id } = req.params;
      const data = await DutyService.deleteDuty(Number(id));
      res.json([data]);
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError(500, 'Failed to delete duty');
    }
  }
);

// List duties
router.get('/list', async (req: Request, res: Response<ListDutiesResponse>) => {
  try {
    const data = await DutyService.listDuties();
    res.json(data);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    throw new HttpError(500, 'Failed to fetch duties');
  }
});

export default router;
