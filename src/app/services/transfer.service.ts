import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IAddressee } from '../models/Addressee.model';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  get apiUrl(): string {
    return environment.api_url + '/transfer/';
  }

  constructor(private http: HttpClient) {}

  listTransfer(addressee_id: number) {
    return this.http.get(`${this.apiUrl}${addressee_id}`);
  }

  sendTransfer(addressee: IAddressee, monto: number) {
    return this.http.post(this.apiUrl + 'send', {addressee_id: addressee.id, monto});
  }

}
