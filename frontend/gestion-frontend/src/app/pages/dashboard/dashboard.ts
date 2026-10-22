import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';



@Component({
  selector: 'app-dashboard',
  standalone: true,

  imports: [
    RouterLink
  ],

  templateUrl: './dashboard.html',

  styleUrl: './dashboard.css'
})


export class Dashboard {


  constructor(

    private authService: AuthService

  ){}





  deconnexion(){


    this.authService.logout();


  }



}