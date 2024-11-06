import { z } from 'zod';

// Base schemas
export const DutySchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  is_done: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
});

// Create Duty
export const CreateDutyRequestSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
  }),
});
export type CreateDutyRequest = z.infer<typeof CreateDutyRequestSchema>;
export type CreateDutyResponse = z.infer<typeof DutySchema>[];

// Update Duty
export const UpdateDutyRequestSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID is required'),
  }),
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    is_done: z.boolean(),
  }),
});
export type UpdateDutyRequest = z.infer<typeof UpdateDutyRequestSchema>;
export type UpdateDutyResponse = z.infer<typeof DutySchema>[];

// Delete Duty
export const DeleteDutyRequestSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID is required'),
  }),
});
export type DeleteDutyRequest = z.infer<typeof DeleteDutyRequestSchema>;
export type DeleteDutyResponse = z.infer<typeof DutySchema>[];

// List Duties
export type ListDutiesResponse = z.infer<typeof DutySchema>[];
