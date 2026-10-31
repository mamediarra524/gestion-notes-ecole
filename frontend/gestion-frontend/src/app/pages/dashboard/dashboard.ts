import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';



@Component({

  selector:'app-dashboard',

  standalone:true,

  imports:[
    CommonModule,
    RouterLink
  ],

  templateUrl:'./dashboard.html',

  styleUrl:'./dashboard.css'

})


export class Dashboard implements OnInit {



  user:any = null;





  constructor(

    private authService:AuthService

  ){}





  ngOnInit():void{


    const utilisateur = localStorage.getItem('user');



    if(utilisateur){


      this.user = JSON.parse(utilisateur);


    }



    console.log(
      "Utilisateur connecté :",
      this.user
    );


  }







  estAdmin():boolean{


    return this.user?.role === 'ADMIN';


  }








  estEnseignant():boolean{


    return this.user?.role === 'ENSEIGNANT';


  }







  deconnexion(){


    this.authService.logout();


  }



}
