import { container } from '@/electron/services/container';
import { SERVICE_IDENTIFIERS } from '@/electron/services/service-identifiers';
import { registerProxy } from 'electron-ipc-cat/server';
import { IPC_DESCRIPTORS } from '@/electron/services/ipc-descriptors';

export const initializeServices = () => {
  Object.values(SERVICE_IDENTIFIERS).forEach((symbol) => {
    // get service
    const service = container.get(symbol);

    // get service descriptor
    const serviceDescriptor = IPC_DESCRIPTORS[symbol];

    // registering service to service availabel in renderer
    if (serviceDescriptor) registerProxy(service, serviceDescriptor);
  });
};
