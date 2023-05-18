import { Component } from '@angular/core';
import { CompanyService } from './company.service';
import { Company } from './company.types';
import { MatDialog } from '@angular/material/dialog';
import { CreateCompanyComponent } from './create-company/create-company.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {

  companies: Company[] = [];
  company: any;

  constructor(
    private companyService: CompanyService,
    public dialog: MatDialog,
    ) {}

  ngOnInit(): void {
    this.getCompanies();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateCompanyComponent, {
      data: { title: 'Create', name: '', addrs: [] },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.company = result;
      this.postCompany({ name: result.name, postalAddresses: result.addrs} );
    });
  }

  onEditCompany(company: Company): void {
    const dialogRef = this.dialog.open(CreateCompanyComponent, {
      data: { title: 'Edit', id: company.id, name: company.name, addrs: company.postalAddresses },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.company = result;
      this.updateCompany({ id: result.id, name: result.name, postalAddresses: result.addrs} );
    });
  }

  getCompanies(): void {
    this.companyService.getCompanies()
        .subscribe(companies => this.companies = companies);
  }

  postCompany(company: Company): void {
    this.companyService.postCompany(company)
        .subscribe( _ => {
          this.getCompanies();
        });
  }

  updateCompany(company: Company): void {
    this.companyService.updateCompany(company)
        .subscribe( _ => {
          this.getCompanies();
        });
  }

  removeCompany(id: string | undefined): void {
    if (!id) return;
    this.companyService.removeCompany(id)
        .subscribe(_ => {
          console.log("called");
          this.getCompanies();
        });
  }
}
