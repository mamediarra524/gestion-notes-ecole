import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

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



  constructor(

    private dashboardService: DashboardService,

    private cd: ChangeDetectorRef

  ){}





  ngOnInit(): void {



    this.chargerStatistiques();



  }






  chargerStatistiques(){



    this.dashboardService.getDashboard()

    .subscribe({



      next:(result:any)=>{



        console.log(
          "Statistiques reçues :",
          result
        );



        this.data = result;



        // Force Angular à rafraîchir l'affichage

        this.cd.detectChanges();



      },



      error:(err:any)=>{



        console.log(
          "Erreur statistiques :",
          err
        );



      }



    });



  }



}