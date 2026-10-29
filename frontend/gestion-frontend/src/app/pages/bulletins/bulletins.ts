import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


import { BulletinService } from '../../services/bulletin';
import { EleveService } from '../../services/eleve';
import { ClasseService } from '../../services/classe';



@Component({

  selector:'app-bulletins',

  standalone:true,

  imports:[

    CommonModule,

    FormsModule,

    RouterLink

  ],

  templateUrl:'./bulletins.html',

  styleUrl:'./bulletins.css'

})


export class Bulletins {



  // ==========================
  // Classes
  // ==========================

  classes:any[]=[];

  classeId:number|null=null;





  // ==========================
  // Élèves de la classe
  // ==========================

  elevesClasse:any[]=[];





  // ==========================
  // Bulletin affiché
  // ==========================

  bulletin:any=null;



  message:string='';







  constructor(

    private bulletinService:BulletinService,

    private eleveService:EleveService,

    private classeService:ClasseService,

    private cdr:ChangeDetectorRef

  ){


    this.chargerClasses();


  }









  // ==========================
  // Charger les classes
  // ==========================

  chargerClasses(){


    this.classeService

    .getClasses()

    .subscribe({

      next:(data:any)=>{


        console.log(

          "Classes reçues :",

          data

        );



        this.classes = Array.isArray(data)

        ? [...data]

        : data.data ?? [];



        this.cdr.detectChanges();


      },


      error:(err:any)=>{


        console.error(

          "Erreur classes :",

          err

        );



        this.message =

        "Erreur chargement classes";


      }


    });


  }









  // ==========================
  // Charger les élèves d'une classe
  // ==========================

  chargerElevesClasse(){



    this.bulletin=null;



    if(this.classeId === null){


      this.elevesClasse=[];


      return;


    }







    this.eleveService

    .getElevesParClasse(this.classeId)

    .subscribe({

      next:(data:any)=>{


        console.log(

          "Élèves reçus :",

          data

        );



        this.elevesClasse = Array.isArray(data)

        ? [...data]

        : data.data ?? [];



        this.message='';



        this.cdr.detectChanges();



      },


      error:(err:any)=>{


        console.error(

          "Erreur élèves :",

          err

        );



        this.message =

        "Erreur chargement élèves";


      }


    });



  }









  // ==========================
  // Afficher bulletin
  // ==========================

  voirBulletin(id:number){



    console.log(

      "ID élève envoyé :",

      id

    );





    this.bulletinService

    .getBulletin(id)

    .subscribe({

      next:(data:any)=>{


        console.log(

          "Bulletin reçu :",

          data

        );



        // vider ancien bulletin

        this.bulletin=null;



        setTimeout(()=>{


          this.bulletin={...data};



          console.log(

            "Bulletin affiché :",

            this.bulletin

          );



          this.message='';



          this.cdr.detectChanges();



          // descendre automatiquement

          this.scrollVersBulletin();



        },100);



      },


      error:(err:any)=>{


        console.error(

          "Erreur bulletin :",

          err

        );



        this.message =

        "Erreur chargement bulletin";


      }


    });



  }









  // ==========================
  // Scroll automatique
  // ==========================

  scrollVersBulletin(){


    setTimeout(()=>{


      const element = document.getElementById('bulletin');



      if(element){


        element.scrollIntoView({

          behavior:'smooth',

          block:'start'

        });


      }


    },200);


  }









  // ==========================
  // Télécharger PDF
  // ==========================

  telechargerPDF(id:number){



    this.bulletinService

    .getBulletinPdf(id)

    .subscribe({

      next:(data:Blob)=>{


        const url =

        window.URL.createObjectURL(data);



        const lien =

        document.createElement('a');



        lien.href=url;



        lien.download=

        'bulletin.pdf';



        lien.click();



        window.URL.revokeObjectURL(url);



      },


      error:(err:any)=>{


        console.error(

          "Erreur PDF :",

          err

        );



        this.message =

        "Erreur téléchargement PDF";


      }


    });



  }



}