import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private http = inject(HttpClient);

  private router = inject(Router);



  private apiUrl = "http://127.0.0.1:8000/api";







  login(data:any){


    return this.http.post(

      `${this.apiUrl}/login`,

      data

    );


  }









  saveToken(token:string){


    localStorage.setItem(

      'token',

      token

    );


  }









  getToken(){


    return localStorage.getItem('token');


  }









  isLoggedIn(): boolean {


    return !!this.getToken();


  }









  logout(){


    // Supprimer le token

    localStorage.removeItem('token');



    // Retourner vers la page login

    this.router.navigate(['/login']);


  }



}