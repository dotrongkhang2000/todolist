import { z } from 'zod';

export const schemaFormActionWorkspace = z.object({
  name: z.string().min(1, 'Please enter a name workspace before submit'),
});

export const schemaFormTask = z.object({
  title: z.string().min(1, 'Please enter a title task before submit'),
});
