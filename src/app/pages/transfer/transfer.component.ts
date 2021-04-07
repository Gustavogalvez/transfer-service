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
  providers: [
    { provide: MatFormFieldControl, useExisting: TransferComponent }
  ]
})
export class TransferComponent implements OnInit {
  addressee = new FormControl();
  monto!: number;


  bancos!: any[];
  filteredOptions!: Observable<IAddressee[]>;


  /** Loading para cuando se busca un destinatario */
  loadingAddressee: boolean = false;
  /** Loading para cuando se envía la transferencia */
  loadingSendData!: boolean;
  /**
   * Bandera para saber si existen destinatarios
   *
   * *Realmente si no existen se redirecciona a crear un destinatario */
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


    /** Se inicializa las opciones del filtro (Destinatarios) */
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


    /** Se suscribe a los cambios en el formControl */
    this.addressee.valueChanges.subscribe(value => {
      // Este if es porque se reutiliza el formControl para asignar el destinatario completo
      if (typeof value === 'string') {
        this.loadingAddressee = true;
        // Se asigna el observable de las opciones con el texto correspondiente
        this.filteredOptions = this.addresseeService.retrieveAddressees(value).pipe(
          map(data => {
            this.loadingAddressee = false;
            return data;
          })
        );
      }
    });


  }

  /** Función que parcha el formControl (addressee) con el banco encontrado por id */
  addBanco() {
    let banco = this.bancos.find(banco =>  banco.value.includes(this.addressee.value.banco_id));
    this.addressee.patchValue({...this.addressee.value, banco});
  }

  /** Función para desplegar en el autocomplete */
  displayFn(addressee: IAddressee) {
    return addressee?.nombre ? (addressee.nombre + ' - ' + addressee.rut) : '';
  }

  /**
   * Función para transferir
   * * Se asegura de que estén correctos los datos
   * * Setea los loading en true o false según corresponda
   * * Si todo sale bien, reinicia el monto a 0 y emite una alerta
   */
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
