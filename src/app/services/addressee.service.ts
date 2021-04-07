import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IAddressee } from '../models/Addressee.model';

@Injectable({
  providedIn: 'root'
})
export class AddresseeService {

  get apiUrl(): string {
    return environment.api_url + '/addressee/';
  }

  constructor(private http: HttpClient) {}

  /**
   * Obtiene el listado de los destinatarios filtrados por el nombre entregado
   * @param search Nombre a buscar
   * @returns Observable<IAddressee[]>
   */
  retrieveAddressees(search?: string): Observable<IAddressee[]> {
    return this.http.get<IAddressee[]>(this.apiUrl + 'list' + (search ? `/${search}` : ''));
  }

  /**
   * Agrega un destinatario
   * @param addressee Destinatario de tipo IAddressee
   * @returns Observable<{msg}>
   */
  newAddressee(addressee: IAddressee) {
    return this.http.post(this.apiUrl + 'add', addressee);
  }

}
