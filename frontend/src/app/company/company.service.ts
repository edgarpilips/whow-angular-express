import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Company } from './company.types';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {

  private COMPANY_URL = 'http://localhost:4000/company';
  private POSTAL_ADDRESS_URL = 'http://localhost:4000/postal-address';

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.COMPANY_URL);
  }

  postCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(this.COMPANY_URL, company);
  }

  updateCompany(company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.COMPANY_URL}/${company.id}`, company);
  }

  removeCompany(id: string): Observable<any> {
    return this.http.delete<any>(`${this.COMPANY_URL}/${id}`);
  }

  removePostalAddress(id: string): Observable<any> {
    return this.http.delete<any>(`${this.POSTAL_ADDRESS_URL}/${id}`);
  }
}
