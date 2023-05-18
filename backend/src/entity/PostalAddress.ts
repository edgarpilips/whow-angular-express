import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Company } from './Company';


@Entity()
export class PostalAddress {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    code: string;

    @Column()
    address: string;

    @ManyToOne(() => Company, (company) => company.postalAddresses)
    company: Company;
}