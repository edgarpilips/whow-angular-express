export type Company = {
    id?: string;
    name: string;
    postalAddresses: PostalAddress[];
}

export type PostalAddress = {
    id?: string;
    code: string;
    address: string;
}