import { transition } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CreateTransaccionDTO } from '@shared/dto/create-transaccion-dto';
import { TipoTransaccionModel } from '@shared/models/tipo-transaccion-model';
import { TransactionModel } from '@shared/models/transaction-model';
import { TipoTransaccionService } from '@shared/services/tipo-transaccion.service';
import { TransaccionService } from '@shared/services/transaccion.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
 
  private formBuilder = inject(FormBuilder);
  private transaccionService = inject(TransaccionService);
  private tipoTransaccionService = inject(TipoTransaccionService);

  formTransactions:FormGroup|null = null
  indexTransaction:number|null = null

  transactions:TransactionModel[] = [ ];
  tipoTransaccions:TipoTransaccionModel[]=[];

  ngOnInit(): void {
    this.getData();
  }


  getData(){

    const datasub =  forkJoin([
      this.transaccionService.getAll(),
      this.tipoTransaccionService.getAll()

    ]).subscribe({
      next:([transactions, tipoTransaccions])=>{
        this.transactions=  [...transactions];
        this.tipoTransaccions = [...tipoTransaccions];
      },
      complete(){
        datasub.unsubscribe();
        
      },


    })
  }

  createForm(){
    this.formTransactions = this.formBuilder.group({
      amount:new FormControl(null,[Validators.required]),
      descripcion:new FormControl(null,[Validators.required]),
      tipo_transaccion_id:new FormControl(null,[Validators.required]),
      date:new FormControl(null,[Validators.required]),
    });
  }

  updateForm(transaction:TransactionModel,index:number){
    this.indexTransaction = index;
    this.formTransactions = this.formBuilder.group({
      amount:new FormControl(transaction.amount,[Validators.required]),
      reason:new FormControl(transaction.descripcion,[Validators.required])
    });
  }

  cancelarForm(){
    this.indexTransaction = null;
    this.formTransactions = null;
  }



  guardarForm(){
    if (!this.formTransactions||this.formTransactions.invalid) {
      alert("Formlario incompleto");
      return;
    }

    const {value} = this.formTransactions;
    const newTransaction: CreateTransaccionDTO = value as CreateTransaccionDTO;
     const saveSub = this.transaccionService.create(newTransaction).subscribe({
      next:(transaction)=>{
        this.transactions = [...this.transactions,transaction];
        this.cancelarForm();

      },
      complete:()=>{

        saveSub.unsubscribe();

      }
    })



    
  }


  // guardarForm(){
  //   if (!this.formTransactions||this.formTransactions.invalid) {
  //     alert("Formlario incompleto");
  //     return;
  //   }

  //   const {value} = this.formTransactions;
  //   const newTransaction:TransactionModel = value as TransactionModel;

  //   if (this.indexTransaction !== null) {
  //     let transactions = [...this.transactions];
  //     transactions[this.indexTransaction] = newTransaction;
  //     this.transactions = transactions;
  //     this.cancelarForm();
  //     return;
  //   }
  //   let transactions = [...this.transactions,newTransaction];
  //   this.transactions = transactions;
  //   this.cancelarForm();
  // }





  deleteTransaction(index:number){
    let transactions = [...this.transactions];
    transactions.splice(index,1);
    this.transactions = transactions;
  }



}
