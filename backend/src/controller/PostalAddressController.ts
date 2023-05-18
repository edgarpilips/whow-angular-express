import { getRepository } from 'typeorm';
import { Request } from 'express';

import { PostalAddress } from '../entity/PostalAddress';

export class PostalAddressController {
  private postalAddressRepository = getRepository(PostalAddress);

  async allByCompanyId(request: Request) {
    return this.postalAddressRepository.find({
      where: {
        company: request.params.companyId,
      },
    });
  }

  async save(request: Request) {
    try {
      return this.postalAddressRepository.save({...request.body, company: request.params.companyId});
    } catch (err) {
      throw err;
    }
  }

  async remove(request: Request) {
    try {
      return this.postalAddressRepository.delete({ id: request.params.id });
    } catch (err) {
      throw err;
    }
  }
}
