import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddresseeService } from 'src/app/services/addressee.service';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { FieldsNewAdressee } from './new-addressee.formly';

@Component({
  selector: 'app-new-addresse',
  templateUrl: './new-addressee.component.html',
  styleUrls: ['./new-addressee.component.scss']
})
export class NewAddresseeComponent implements OnInit {
  /** https://github.com/angular/components/issues/4190#issuecomment-305031716 */
  @ViewChild('f') myNgForm: any;
  form = new FormGroup({});
  model: any = {};
  fields = new FieldsNewAdressee(this.dataSharedService).fields;
  loading = false;

  constructor(
    private dataSharedService: DataSharedService,
    private addreesseeService: AddresseeService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {}

  newAddressee() {
    if (this.form.valid) {
      this.loading = true;
      this.addreesseeService.newAddressee(this.model).subscribe(resp => {
        this.myNgForm.resetForm();
        this.loading = false;
        this._snackBar.open('Destinatario Creado!', 'cerrar', {
          duration: 3000,
        });
      }, () => {this.loading = false;});
    }
  }

}
