import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { FieldsNewAdressee } from './new-addressee.formly';

@Component({
  selector: 'app-new-addresse',
  templateUrl: './new-addressee.component.html',
  styleUrls: ['./new-addressee.component.scss']
})
export class NewAddresseeComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  fields = new FieldsNewAdressee(this.dataSharedService).fields;

  constructor(private dataSharedService: DataSharedService) { }

  ngOnInit(): void {}

  newAddressee() {
    if (this.form.valid) {
      console.log(this.model);
    }
  }

}
