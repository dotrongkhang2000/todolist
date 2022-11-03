import { contextBridge } from 'electron';
import { servicesMethod } from '@/electron-preload/services-method';
import {
  IServicesWithOnlyObservables,
  IServicesWithoutObservables,
} from 'electron-ipc-cat/common';

const versions = {
  node: () => process.versions.node,
};

const windowRemoteMethods = {
  getFlatform: () => process.platform,
};

contextBridge.exposeInMainWorld('service', servicesMethod);

declare global {
  interface Window {
    service: IServicesWithoutObservables<typeof servicesMethod>;
    observables: IServicesWithOnlyObservables<typeof servicesMethod>;
  }
}

contextBridge.exposeInMainWorld('version', versions);
contextBridge.exposeInMainWorld('windowRemote', windowRemoteMethods);

declare global {
  interface Window {
    versions: typeof versions;
    windowRemote: typeof windowRemoteMethods;
  }
}
