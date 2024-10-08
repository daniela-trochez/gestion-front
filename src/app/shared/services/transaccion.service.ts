import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { CreateTransaccionDTO } from '@shared/dto/create-transaccion-dto';

import { TransactionModel } from '@shared/models/transaction-model';
const {API_URL}= environment;

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  private http = inject(HttpClient);

  url:string = `${API_URL}/transaccions`;

  constructor() { }

  getAll(){
    return this.http.get<TransactionModel[]>(this.url);

  }

  create(data:CreateTransaccionDTO){
    return this.http.post<TransactionModel>(this.url,data);

  }
}
