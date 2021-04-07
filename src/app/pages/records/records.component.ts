import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ITransfer } from 'src/app/models/Transfer.model';
import { DataSharedService } from 'src/app/services/data-shared.service';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  transfers!: ITransfer[];

  constructor(
    private transferService: TransferService,
    private dataSharedService: DataSharedService
    ) { }

  ngOnInit(): void {
    forkJoin([
      this.transferService.listTransfer(),
      this.dataSharedService.listBank()
    ]).subscribe((data: any) => {
      let bancos = data[1];
      this.transfers = data[0].map((transfer: ITransfer) => {
        return {...transfer, banco: bancos.find((banco: any) =>  banco.value.includes(transfer.banco_id))}
      });
    });
  }

}
