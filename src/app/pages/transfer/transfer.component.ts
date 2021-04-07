import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAddressee } from 'src/app/models/Addressee.model';
import { AddresseeService } from 'src/app/services/addressee.service';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: TransferComponent }
  ]
})
export class TransferComponent implements OnInit {
  addressee = new FormControl();
  monto!: number;
  filteredOptions!: Observable<IAddressee[]>;
  loading: boolean = false;
  bancos!: any[];
  loadingSendData!: boolean;
  sinDestinatario: boolean = true;

  constructor(
    private addresseeService: AddresseeService,
    private dataSharedService: DataSharedService,
    private transferService: TransferService,
    private _snackBar: MatSnackBar,
    private router: Router
    ) {}

  ngOnInit() {
    this.dataSharedService.listBank().subscribe(bancos => {
      this.bancos = bancos;
    });
    this.filteredOptions = this.addresseeService.retrieveAddressees('').pipe(
      map(data => {
        this.sinDestinatario = data.length === 0;
        if (this.sinDestinatario) {
          this.router.navigate(['/new-addressee']);
          this._snackBar.open('No existen destinatarios para transferir!', 'cerrar', {
            duration: 5000,
          });
        }
        return data;
      })
    );
    this.addressee.valueChanges.subscribe(value => {
      if (typeof value === 'string') {
        this.loading = true;
        this.filteredOptions = this.addresseeService.retrieveAddressees(value).pipe(
          map(data => {
            this.loading = false;
            return data;
          })
        );
      }
    });
  }

  addBanco() {
    let banco = this.bancos.find(banco =>  banco.value.includes(this.addressee.value.banco_id));
    this.addressee.patchValue({...this.addressee.value, banco});
    // this.transferService.listTransferByAddressee(this.addressee.value.id).subscribe((resp) => {});
  }

  displayFn(addressee: IAddressee) {
    return addressee?.nombre ? (addressee.nombre + ' - ' + addressee.rut) : '';
  }

  transferir() {
    if ((this.addressee?.value?.id !== 0) && (this.monto > 0)) {
      this.loadingSendData = true;
      this.transferService.sendTransfer(this.addressee.value, this.monto).subscribe(resp => {
        this.loadingSendData = false;
        this.monto = 0;
        this._snackBar.open('Transferencia Realizada!', 'cerrar', {
          duration: 3000,
        });
      }, () => {this.loadingSendData = false;})
    }
  }

}
