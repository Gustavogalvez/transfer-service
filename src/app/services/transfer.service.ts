import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IAddressee } from '../models/Addressee.model';
import { ITransfer } from '../models/Transfer.model';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  get apiUrl(): string {
    return environment.api_url + '/transfer/';
  }

  constructor(private http: HttpClient) {}

  /**
   * Obtiene las transferencias por destinatario
   * @param addressee_id ID del destinatario
   * @returns
   */
  listTransferByAddressee(addressee_id: number) {
    return this.http.get(`${this.apiUrl}${addressee_id}`);
  }

  /**
   * Obtiene el listado de las transferencias
   * @returns Observable<ITransfer[]>
   */
  listTransfer() {
    return this.http.get<ITransfer[]>(this.apiUrl + 'list');
  }

  /**
   * Agrega una transferencia a un destinatario
   * @param addressee Destinatario de tipo IAddressee
   * @param monto Monto a depositar
   * @returns Observable<{msg}}>
   */
  sendTransfer(addressee: IAddressee, monto: number) {
    return this.http.post(this.apiUrl + 'send', {addressee_id: addressee.id, monto});
  }

}
