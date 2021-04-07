import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
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

  constructor(
    private addresseeService: AddresseeService,
    private dataSharedService: DataSharedService,
    private transferService: TransferService
    ) {}

  ngOnInit() {
    this.dataSharedService.listBank().subscribe(bancos => {
      this.bancos = bancos;
    });
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
    console.log(this.addressee.value);
    this.transferService.listTransfer(this.addressee.value.id).subscribe((resp) => {
      console.log(resp);
    });
  }

  displayFn(addressee: IAddressee) {
    return addressee?.nombre ? (addressee.nombre + ' - ' + addressee.rut) : '';
  }

  transferir() {
    console.log(this.addressee.value);
    console.log(this.monto);
    if ((this.addressee?.value?.id !== 0) && (this.monto > 0)) {
      this.transferService.sendTransfer(this.addressee.value, this.monto).subscribe(resp => {
        console.log(resp);
      })
    }
  }

}
