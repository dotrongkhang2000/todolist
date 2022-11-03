import type { IMenuService } from '@/electron/services/menu/interfaces';
import { menuServiceDescriptor } from '@/electron/services/menu/ipc-descriptor';
import { createProxy } from 'electron-ipc-cat/client';
import { AsyncifyProxy } from 'electron-ipc-cat/common';

export const servicesMethod = {
  menu: createProxy<AsyncifyProxy<IMenuService>>(menuServiceDescriptor),
  descriptors: {
    menu: menuServiceDescriptor,
  },
};
