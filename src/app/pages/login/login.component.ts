import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginDTO } from '@shared/dto/login.dto';
import { AuthService } from '@shared/services/auth.service';
import { TokenServiceTsService } from '@shared/services/token.service.ts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{

  private auth_srvice = inject(AuthService);
  private token_service = inject(TokenServiceTsService);

  email:string = '';
  password:string = '';

  login_sub:Subscription | null = null;
  ngOnDestroy():void{
    if (this.login_sub){
      this.login_sub.unsubscribe

    }
  }




  login(){
    let data:LoginDTO={
      email:this.email,
      password:this.password
    }
    this.login_sub = this.auth_srvice.login(data).subscribe({
      next:(token)=>{
        this.token_service.setToken(token);
      }
       
    
    })
  }


}
