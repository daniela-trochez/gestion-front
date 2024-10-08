import { TransactionModel } from "./transaction-model";

export interface TipoTransaccionModel {
    id:number;
    name:string;
    transaccions?:TransactionModel[];
}
