import { contextBridge } from 'electron';

const versions = {
  node: () => process.versions.node,
};

contextBridge.exposeInMainWorld('version', versions);

declare global {
  interface Window {
    versions: typeof versions;
  }
}
