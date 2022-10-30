import { container } from '@/electron/services/container';
import { IMenuService } from '@/electron/services/menu/interfaces';
import { SERVICE_IDENTIFIERS } from '@/electron/services/service-identifiers';
import { contextBridge } from 'electron';

const versions = {
  node: () => process.versions.node,
};

const windowRemoteMethods = {
  getFlatform: () => process.platform,
};

const menu = container.get<IMenuService>(SERVICE_IDENTIFIERS.Menu);

contextBridge.exposeInMainWorld('version', versions);
// contextBridge.exposeInMainWorld('menu', menu);
contextBridge.exposeInMainWorld('windowRemote', windowRemoteMethods);

declare global {
  interface Window {
    versions: typeof versions;
    menu: typeof menu;
    windowRemote: typeof windowRemoteMethods;
  }
}
