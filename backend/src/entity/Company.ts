import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PostalAddress } from './PostalAddress';

@Entity()
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => PostalAddress, (postalAddress) => postalAddress.company)
    postalAddresses: PostalAddress[];
}