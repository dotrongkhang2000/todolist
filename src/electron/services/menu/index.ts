import { injectable } from 'inversify';
import { Menu } from 'electron';
import { IMenuService } from '@/electron/services/menu/interfaces';

@injectable()
class MenuService implements IMenuService {
  popup() {
    const template: Electron.MenuItemConstructorOptions[] = [
      {
        label: 'Edit',
      },
      {
        label: 'Remove',
      },
    ];

    const menu = Menu.buildFromTemplate(template);

    menu.popup();
  }
}

export { MenuService };
