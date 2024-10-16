import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { CreateTransaccionDTO } from '@shared/dto/create-transaccion-dto';
import { UpdateTransaccionDTO } from '@shared/dto/update-transaccion-dto';

import { TransactionModel } from '@shared/models/transaction-model';
// const {API_URL}= environment;

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  private http = inject(HttpClient);

  url:string = `transaccions`;
  // ${API_URL}

  constructor() { }

  getAll(){
    return this.http.get<TransactionModel[]>(this.url);

  }

  create(data:CreateTransaccionDTO){
    return this.http.post<TransactionModel>(this.url,data);

  }

  update(data:UpdateTransaccionDTO){
    const{id} = data;
    return this.http.put<TransactionModel>(`${this.url}/${id}`,data) ;

  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }
}
