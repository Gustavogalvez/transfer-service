import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { NewAddresseeRoutingModule } from './new-addressee-routing.module';
import { NewAddresseeComponent } from './new-addressee.component';


@NgModule({
  declarations: [NewAddresseeComponent],
  imports: [
    CommonModule,
    NewAddresseeRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'Este campo es requerido.' },
      ]
    }),
    FormlyMaterialModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ],
})
export class NewAddresseeModule { }
