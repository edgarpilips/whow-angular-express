import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { NotFoundError } from '../common/errorValidation/errors';

import { Company } from '../entity/Company';
import { PostalAddress } from '../entity/PostalAddress';

export class CompanyController {
  private companyRepository = getRepository(Company);
  private postalAddressRepository = getRepository(PostalAddress);

  async all() {
    return this.companyRepository
      .createQueryBuilder('company')
      .leftJoinAndSelect('company.postalAddresses', 'postal_address')
      .getMany();
  }

  async one(request: Request) {
    return this.companyRepository.findOne(request.params.id);
  }

  async save(request: Request) {
    try {

      const { name, postalAddresses: addresses } = request.body;

      const newCompany = await this.companyRepository.save({ name });

      const addrs = addresses.map(addr => {
        return { ...addr, company: newCompany.id }
      });

      await this.postalAddressRepository
                .createQueryBuilder()
                .insert()
                .into(PostalAddress)
                .values(addrs)
                .execute();
      return newCompany;
    } catch (err) {
      throw err;
    }
  }

  async update(request: Request) {
    try {
      
      const addrs = request.body.postalAddresses.map(addr => {
        return { ...addr, company: request.params.id }
      });

      await this.postalAddressRepository
                .upsert(
                  addrs,
                  ['id']
                );

      const data = await this.companyRepository
        .createQueryBuilder()
        .update(Company)
        .set({
          name: request.body.name
        })
        .where('id = :id', { id: request.params.id })
        .execute();
        
      if (data.affected === 1) {
        return { message: 'record successfully updated' };
      } else {
        throw new NotFoundError();
      }
    } catch (err) {
      throw err;
    }
  }

  async remove(request: Request, response: Response) {
    try {
      await this.postalAddressRepository
                .createQueryBuilder()
                .delete()
                .from(PostalAddress)
                .where('company = :id', { id: request.params.id })
                .execute();

      const data = await this.companyRepository
        .createQueryBuilder()
        .delete()
        .from(Company)
        .where('id = :id', { id: request.params.id })
        .execute();
      if (data.affected === 1) {
        return { message: 'record successfully deleted' };
      } else {
        throw new NotFoundError();
      }
    } catch (err) {
      throw err;
    }
  }
}
