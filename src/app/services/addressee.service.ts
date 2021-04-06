import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddressee } from '../models/Addressee.model';

@Injectable({
  providedIn: 'root'
})
export class AddresseeService {

  get apiUrl(): string {
    return environment.api_url + '/addressee/';
  }

  constructor(private http: HttpClient) {}

  retrieveAddressees(): Observable<IAddressee[]> {
    return this.http.get<IAddressee[]>(this.apiUrl + 'list');
  }

  newAddressee(addressee: IAddressee) {
    return this.http.post(this.apiUrl + 'add', addressee);
  }

}
