import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardService } from '../../services/dashboard';



@Component({

  selector: 'app-statistiques',

  standalone: true,

  imports: [

    CommonModule,

    RouterModule

  ],

  templateUrl: './statistiques.html',

  styleUrl: './statistiques.css'

})


export class Statistiques implements OnInit {



  data:any;



  constructor(

    private dashboardService: DashboardService

  ){}





  ngOnInit(): void {



    this.chargerStatistiques();



  }






  chargerStatistiques(){



    this.dashboardService.getDashboard()

    .subscribe({



      next:(result:any)=>{



        console.log(
          'Statistiques reçues :',
          result
        );



        this.data = result;



      },





      error:(err)=>{



        console.log(
          'Erreur chargement statistiques :',
          err
        );



      }



    });



  }



}