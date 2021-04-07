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
        {
          className: 'col-md-6',
          type: 'input',
          key: 'correo',
          validation: {
            messages: {
              pattern: 'Debe ser un email valido!'
            }
          },
          templateOptions: {
            required: true,
            label: 'Correo',
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          },
        },
        {
          className: 'col-md-6',
          type: 'input',
          key: 'telefono',
          templateOptions: {
            required: true,
            label: 'Teléfono',
            type: 'number'
          },
        }
      ],
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-md-6',
          key: 'banco_id',
          type: 'select',
          templateOptions: {
            label: 'Banco',
            required: true,
            options: this.dataSharedService.listBank()
          }
        },
        {
          className: 'col-md-6',
          key: 'tipo_cuenta',
          type: 'select',
          templateOptions: {
            label: 'Tipo de Cuenta',
            required: true,
            options: [
              { value: 'Vista', label: 'Cuenta Vista' },
              { value: 'Corriente', label: 'Cuenta Corriente'  },
              { value: 'Ahorro', label: 'Cuenta de Ahorro'  },
            ],
          },
        },
      ],
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        this.getSimpleForm('nro_cuenta', 'N° de Cuenta', true)
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
        label: label ?? (key[0].toLocaleUpperCase() + key.slice(1))
      },
    }
  }

}
