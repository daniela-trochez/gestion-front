import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TransactionModel } from '@shared/models/transaction-model';

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
export class AppComponent {

  private formBuilder = inject(FormBuilder);

  formTransactions:FormGroup|null = null
  indexTransaction:number|null = null

  transactions:TransactionModel[] = [
    {
      amount:2000,
      reason:"pago"
    },
    {
      amount:2000,
      reason:"deuda"
    }
  ];

  createForm(){
    this.formTransactions = this.formBuilder.group({
      amount:new FormControl(null,[Validators.required]),
      reason:new FormControl(null,[Validators.required])
    });
  }

  updateForm(transaction:TransactionModel,index:number){
    this.indexTransaction = index;
    this.formTransactions = this.formBuilder.group({
      amount:new FormControl(transaction.amount,[Validators.required]),
      reason:new FormControl(transaction.reason,[Validators.required])
    });
  }

  cancelarForm(){
    this.indexTransaction = null;
    this.formTransactions = null;
  }

  guardarForm(){
    if (!this.formTransactions||this.formTransactions.invalid) {
      alert("Formlario incopleto");
      return;
    }

    const {value} = this.formTransactions;
    const newTransaction:TransactionModel = value as TransactionModel;

    if (this.indexTransaction !== null) {
      let transactions = [...this.transactions];
      transactions[this.indexTransaction] = newTransaction;
      this.transactions = transactions;
      this.cancelarForm();
      return;
    }
    let transactions = [...this.transactions,newTransaction];
    this.transactions = transactions;
    this.cancelarForm();
  }

  deleteTransaction(index:number){
    let transactions = [...this.transactions];
    transactions.splice(index,1);
    this.transactions = transactions;
  }



}
