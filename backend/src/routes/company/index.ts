import { RouteInterface } from '../';
import { CompanyController } from '../../controller/CompanyController';

interface CompanyRoutesInterface extends RouteInterface {
  controller: typeof CompanyController;
}

export const CompanyRoutes: CompanyRoutesInterface[] = [
  {
    method: 'get',
    route: '/company',
    controller: CompanyController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/company/:id',
    controller: CompanyController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/company',
    controller: CompanyController,
    action: 'save',
  },
  {
    method: 'put',
    route: '/company/:id',
    controller: CompanyController,
    action: 'update',
  },
  {
    method: 'delete',
    route: '/company/:id',
    controller: CompanyController,
    action: 'remove',
  },
];
