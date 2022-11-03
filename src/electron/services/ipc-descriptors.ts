import { menuServiceDescriptor } from '@/electron/services/menu/ipc-descriptor';
import { SERVICE_IDENTIFIERS } from '@/electron/services/service-identifiers';

export const IPC_DESCRIPTORS = {
  [SERVICE_IDENTIFIERS.Menu]: menuServiceDescriptor,
};
