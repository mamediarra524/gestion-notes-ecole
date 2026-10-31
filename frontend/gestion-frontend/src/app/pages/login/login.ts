import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';



@Component({
  selector: 'app-login',

  standalone: true,

  imports: [
    FormsModule,
    CommonModule
  ],

  templateUrl: './login.html',

  styleUrl: './login.css'
})


export class Login {


  email: string = '';

  password: string = '';

  message: string = '';





  constructor(

    private auth: AuthService,

    private router: Router

  ) {}









  connexion() {


    const data = {


      email: this.email,


      password: this.password


    };









    this.auth.login(data)

    .subscribe({





      next: (response:any) => {



        console.log(

          "Réponse API :",

          response

        );








        // Sauvegarde du token Sanctum

        this.auth.saveToken(

          response.token

        );








        // Sauvegarde de l'utilisateur connecté

        // nécessaire pour roleGuard

        this.auth.saveUser(

          response.user

        );








        this.message =

        "Connexion réussie";








        this.router.navigate([

          '/dashboard'

        ]);





      },








      error:(error:any)=> {



        console.log(

          "Erreur API :",

          error

        );








        this.message =

        "Email ou mot de passe incorrect";





      }





    });




  }



}
