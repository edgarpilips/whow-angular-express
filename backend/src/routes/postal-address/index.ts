import { RouteInterface } from '../';
import { PostalAddressController } from '../../controller/PostalAddressController';


interface PostalAddressRoutesInterface extends RouteInterface {
  controller: typeof PostalAddressController;
}

export const PostalAddressRoutes: PostalAddressRoutesInterface[] = [
  {
    method: 'get',
    route: '/company/:companyId/postal-address',
    controller: PostalAddressController,
    action: 'allByCompanyId',
  },
  {
    method: 'post',
    route: '/company/:companyId/postal-address',
    controller: PostalAddressController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/postal-address/:id',
    controller: PostalAddressController,
    action: 'remove',
  },
];
