import 'reflect-metadata';

import { Container } from 'inversify';
import { MenuService } from '@/electron/services/menu';
import { IMenuService } from '@/electron/services/menu/interfaces';
import { SERVICE_IDENTIFIERS } from '@/electron/services/service-identifiers';

const container = new Container();

container.bind<IMenuService>(SERVICE_IDENTIFIERS.Menu).to(MenuService);

export { container };
