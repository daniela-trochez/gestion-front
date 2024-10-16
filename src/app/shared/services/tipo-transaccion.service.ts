import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { UpdateTransaccionDTO } from '@shared/dto/update-transaccion-dto';
import { TipoTransaccionModel } from '@shared/models/tipo-transaccion-model';
import { TransactionModel } from '@shared/models/transaction-model';
// const {API_URL}= environment;

@Injectable({
  providedIn: 'root'
})
export class TipoTransaccionService {

  private http = inject(HttpClient);

  url:string = `tipos`;
  // ${API_URL}


  constructor() { }

  getAll(){
    return this.http.get<TipoTransaccionModel[]>(this.url);

  }



  // delete(id:number){
  //   return this.http.delete(``);
  // }
}
