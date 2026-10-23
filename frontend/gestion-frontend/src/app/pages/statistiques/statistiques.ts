import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { DashboardService } from '../../services/dashboard';



@Component({

  selector: 'app-statistiques',

  standalone: true,

  imports: [

    CommonModule

  ],

  templateUrl: './statistiques.html',

  styleUrl: './statistiques.css'

})


export class Statistiques implements OnInit {



  data:any = null;

  message:string = '';





  constructor(

    private dashboardService: DashboardService,

    private cd: ChangeDetectorRef,

    private router: Router

  ){}





  ngOnInit(): void {


    this.chargerStatistiques();


  }







  chargerStatistiques(){



    this.dashboardService

    .getDashboard()

    .subscribe({



      next:(result:any)=>{



        console.log(

          "Données statistiques :",

          result

        );



        this.data = result;



        this.cd.detectChanges();



      },



      error:(err:any)=>{



        console.log(err);



        this.message =

        "Erreur chargement statistiques";



      }



    });



  }







  retourDashboard(){



    console.log("Retour dashboard");



    this.router.navigate(['/dashboard']);



  }





}