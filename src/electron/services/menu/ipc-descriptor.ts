import { IPC_CHANNELS } from '@/common/ipc-channels';
import { ProxyPropertyType } from 'electron-ipc-cat/common';

export const menuServiceDescriptor = {
  channel: IPC_CHANNELS.MENU,
  properties: {
    popup: ProxyPropertyType.Function,
  },
};
