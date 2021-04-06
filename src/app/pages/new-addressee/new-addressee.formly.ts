import { FormlyFieldConfig } from "@ngx-formly/core";
import { DataSharedService } from "../../services/data-shared.service";
export class FieldsNewAdressee {
  constructor(private dataSharedService: DataSharedService) {}
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-md-6',
          type: 'input',
          key: 'rut',
          validation: {
            messages: {
              pattern: 'El formato debe ser 11.111.111-1'
            }
          },
          templateOptions: {
            required: true,
            label: 'Rut',
            description: 'Usar el formato 11.111.111-1',
            pattern: /^\d{1,3}\.\d{3}\.\d{3}-[\d{1}|k|K]$/,
          },
        },
        this.getSimpleForm('nombre',undefined,true)
      ],
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        this.getSimpleForm('correo',undefined,true),
        this.getSimpleForm('telefono', 'Teléfono')
      ],
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-md-6',
          key: 'banco',
          type: 'select',
          templateOptions: {
            label: 'Banco',
            required: true,
            options: this.dataSharedService.listBank()
          }
        },
        this.getSimpleForm('cuenta', 'Tipo de Cuenta', true)
      ],
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        this.getSimpleForm('nroCuenta', 'N° de Cuenta', true)
      ],
    },
  ];

  getSimpleForm(key: string, label?: string, required?: boolean): FormlyFieldConfig {
    return {
      className: 'col-md-6',
      type: 'input',
      key: key,
      templateOptions: {
        required: required,
        label: label ?? (key[0].toLocaleUpperCase() + key.slice(1)),
      },
    }
  }

}
