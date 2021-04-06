import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {

  public breadCrumb = '';

  constructor(private http: HttpClient) {}

  listBank() {
    return this.http
    .get('https://bast.dev/api/banks.php')
    .pipe(
      map((data: any) =>
        data?.banks.map((bank: any) => {
          return {label: bank.name, value: bank.id}
        }) || []
      )
    );
  }
}
