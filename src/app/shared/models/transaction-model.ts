import { TipoTransaccionModel } from "./tipo-transaccion-model";

export interface TransactionModel {
    id:number;
    fecha:Date;
    amount:number;
    descripcion:string;
    tipo_transaccion_id:number;
    tipo_transaccion?:TipoTransaccionModel;
}
