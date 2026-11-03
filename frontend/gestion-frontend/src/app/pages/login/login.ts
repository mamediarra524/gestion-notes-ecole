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

      email: this.email.trim(),

      password: this.password

    };


    console.log(
      "Données envoyées :",
      data
    );



    this.auth.login(data)

    .subscribe({



      next: (response:any) => {


        console.log(
          "Réponse API :",
          response
        );



        this.auth.saveToken(
          response.token
        );



        this.auth.saveUser(
          response.user
        );



        this.message =
        "Connexion réussie";



        this.router.navigate([
          '/dashboard'
        ]);



      },



      error: (error:any) => {


        console.log(
          "Erreur API :",
          error
        );


        if(error.status === 401){

          this.message =
          "Email ou mot de passe incorrect";

        }
        else if(error.status === 422){

          this.message =
          "Veuillez remplir correctement les champs";

        }
        else {

          this.message =
          "Erreur serveur";

        }


      }


    });


  }


}
