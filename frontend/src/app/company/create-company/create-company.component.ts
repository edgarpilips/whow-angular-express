import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostalAddress } from '../company.types';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent {

  formData: any;

  constructor(
    public dialogRef: MatDialogRef<CreateCompanyComponent>,
    private companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.formData = data;
  }

  addAddress(): void {
    this.formData.addrs.push({ code: '', address: '' })
  }

  removeAddress(index: number): void {
    console.log(index);
    this.companyService.removePostalAddress(this.formData.addrs[index].id)
        .subscribe(_ => 
            this.formData.addrs = this.formData.addrs.filter((addr: PostalAddress, idx: number) => index !== idx)
        );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
