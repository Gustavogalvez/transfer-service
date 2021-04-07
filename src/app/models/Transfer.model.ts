import { IAddressee } from "./Addressee.model";
/**
 * Interfaz para las transferencias
 *
 * Se extiende de la interfaz para los destinatarios `IAddressee`
 */
export interface ITransfer extends IAddressee {
  monto: number;
  banco?: {value: string, label: string};
}
