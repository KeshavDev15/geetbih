import { z } from 'zod';

export const createAuditSchema = z.object({
  email: z.string().email().optional(),
  bottleneck: z.string().min(1, 'Bottleneck is required'),
  scale: z.string().min(1, 'Scale is required'),
});

export type CreateAuditDto = z.infer<typeof createAuditSchema>;
