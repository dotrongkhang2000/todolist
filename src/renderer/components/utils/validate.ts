import type { ZodSchema, ZodError } from 'zod';

interface Parameters {
  schema: ZodSchema;
  rawData: any;
}

export const validate = <Type>({
  schema,
  rawData,
}: Parameters): { errors: Errors<Type> | null } => {
  try {
    schema.parse(rawData);
  } catch (e) {
    const err = e as ZodError<Type>;

    return {
      errors: err.issues.reduce((accumulator: Errors<Type>, current) => {
        const key = current.path[0] as keyof Type;

        accumulator[key] = current.message;

        return accumulator;
      }, {}),
    };
  }
  return { errors: null };
};
