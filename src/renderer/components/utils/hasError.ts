import type { ZodSchema } from 'zod';
import { validate } from '@/renderer/components/utils/validate';

interface Parameters {
  schema: ZodSchema;
  rawData: any;
  addAlert: (alert: IAlert) => void;
  removeAlert: (indexAlertRemove?: number | undefined) => void;
}

export const hasErrors = <Type>({
  schema,
  rawData,
  addAlert,
  removeAlert,
}: Parameters) => {
  const { errors } = validate<Type>({
    schema,
    rawData,
  });

  if (errors) {
    Object.values(errors).forEach((errorName) => {
      const alert: IAlert = {
        severity: 'error',
        mess: (errorName as string) ?? '',
      };

      addAlert(alert);

      /** Remove alert after 3s */
      setTimeout(() => {
        removeAlert();
      }, 3000);
    });

    return true;
  }

  return false;
};
