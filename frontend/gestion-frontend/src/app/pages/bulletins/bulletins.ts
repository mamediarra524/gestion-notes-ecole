import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BulletinService } from '../../services/bulletin';
import { EleveService } from '../../services/eleve';


@Component({

  selector:'app-bulletins',

  standalone:true,

  imports:[
    CommonModule,
    FormsModule
  ],

  templateUrl:'./bulletins.html',

  styleUrl:'./bulletins.css'

})


export class Bulletins {


  eleves:any[]=[];


  eleveId:number|null=null;


  bulletin:any=null;


  message='';



  constructor(

    private bulletinService:BulletinService,

    private eleveService:EleveService

  ){



    this.chargerEleves();


  }







  chargerEleves(){


    this.eleveService.getEleves()

    .subscribe({

      next:(data:any)=>{

        this.eleves=data;

      }

    });


  }









  afficherBulletin(){


    if(!this.eleveId){

      this.message="Sélectionner un élève";

      return;

    }




    this.bulletinService

    .getBulletin(this.eleveId)

    .subscribe({

      next:(data:any)=>{


        this.bulletin=data;


        this.message='';


      },


      error:()=>{


        this.message="Erreur chargement bulletin";


      }


    });


  }









  telechargerPDF(){


    if(!this.eleveId)
      return;



    this.bulletinService

    .getBulletinPdf(this.eleveId)

    .subscribe((data:any)=>{


      const url=

      window.URL.createObjectURL(data);



      const a=document.createElement('a');


      a.href=url;


      a.download='bulletin.pdf';


      a.click();


      window.URL.revokeObjectURL(url);


    });


  }



}