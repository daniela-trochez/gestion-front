import { transition } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CreateTransaccionDTO } from '@shared/dto/create-transaccion-dto';
import { UpdateTransaccionDTO } from '@shared/dto/update-transaccion-dto';
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

  // updateForm(transaction:TransactionModel,index:number){
  //   this.indexTransaction = index;
  //   this.formTransactions = this.formBuilder.group({
  //     amount:new FormControl(transaction.amount,[Validators.required]),
  //     reason:new FormControl(transaction.descripcion,[Validators.required])
  //   });
  // }

  updateForm(transaction:TransactionModel){
   console.log(transaction);
    this.formTransactions = this.formBuilder.group({
      id:new FormControl(transaction.id),
      amount:new FormControl(transaction.amount,[Validators.required]),
      descripcion:new FormControl(transaction.descripcion,[Validators.required]),
      tipo_transaccion_id:new FormControl(transaction.tipo_transaccion_id,[Validators.required]),
      date:new FormControl(transaction.date,[Validators.required]),

    });
    console.log(this.formTransactions.value);
    
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

    console.log(this.formTransactions.get('id'));

    if(this.formTransactions.get('id')){
      const nuevaTransaccion:UpdateTransaccionDTO= value as UpdateTransaccionDTO;
      const saveSub = this.transaccionService.update(nuevaTransaccion).subscribe({
        next:(transaccion)=>{
          let transacciones = [...this.transactions];
          let transaccion_index = transacciones.findIndex((transaccion)=>transaccion.id=== nuevaTransaccion.id);
          transacciones[transaccion_index]= transaccion;
          this.transactions = transacciones;
          this.cancelarForm();

          
        },
        complete:()=>{
          saveSub.unsubscribe();
        },

      });
      return

    }



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


  // deleteTransaction(index:number){
  //   let transactions = [...this.transactions];
  //   transactions.splice(index,1);
  //   this.transactions = transactions;
  // }

  deleteTransaction(id:number){
    const deleteSub =this.transaccionService.delete(id)
    .subscribe({
      next:(value)=>{
        let transaccions = [...this.transactions]
        let  transaccion_index= transaccions.findIndex((transition)=>transition.id===id);
        transaccions.splice(transaccion_index,1);
        this.transactions = transaccions


      },
      complete:()=>{
        deleteSub.unsubscribe();

      },
    })



  }



}
