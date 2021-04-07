import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RecordsRoutingModule } from './records-routing.module';
import { RecordsComponent } from './records.component';



@NgModule({
  declarations: [RecordsComponent],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    MatProgressBarModule
  ]
})
export class RecordsModule { }
