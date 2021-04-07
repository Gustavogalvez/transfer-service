import { IAddressee } from "./Addressee.model";

export interface ITransfer extends IAddressee {
  monto: number;
  banco?: {value: string, label: string};
}
