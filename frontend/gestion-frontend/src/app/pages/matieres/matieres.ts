import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatiereService } from '../../services/matiere';



@Component({

  selector: 'app-matieres',

  standalone:true,

  imports:[

    CommonModule,

    FormsModule,

    RouterLink

  ],

  templateUrl:'./matieres.html',

  styleUrl:'./matieres.css'

})


export class Matieres implements OnInit {



  matieres:any[] = [];


  message:string = '';



  recherche:string = '';



  modification:boolean = false;


  idModification:number|null = null;





  matiere:any = {


    nom:''


  };






  // =========================
  // PAGINATION
  // =========================


  page:number = 1;


  taillePage:number = 10;


  totalPages:number = 1;









  constructor(


    private matiereService:MatiereService,


    private cd:ChangeDetectorRef


  ){}





  ngOnInit(){


    this.chargerMatieres();


  }









  // =========================
  // CHARGER MATIERES
  // =========================


  chargerMatieres(){


    this.matiereService

    .getMatieres()

    .subscribe({



      next:(data:any)=>{


        console.log(
          "Matières reçues :",
          data
        );



        this.matieres = [...data];



        this.calculerPages();



        this.cd.detectChanges();



      },



      error:(error:any)=>{


        console.log(error);



        this.message =
        "Erreur chargement matières";


      }



    });



  }









  // =========================
  // RECHERCHE + PAGINATION
  // =========================


  get matieresFiltrees(){



    const texte =

    this.recherche

    .toLowerCase()

    .trim();





    let resultat = this.matieres;





    if(texte){


      resultat = this.matieres.filter(

        (matiere:any)=>


        matiere.nom

        .toLowerCase()

        .includes(texte)


      );


    }






    this.totalPages = Math.ceil(

      resultat.length /

      this.taillePage

    );



    if(this.totalPages === 0){


      this.totalPages = 1;


    }







    const debut =

    (this.page - 1)

    *

    this.taillePage;






    return resultat.slice(

      debut,

      debut + this.taillePage

    );



  }









  rechercher(){


    this.page = 1;


  }









  calculerPages(){


    this.totalPages = Math.ceil(

      this.matieres.length /

      this.taillePage

    );



    if(this.totalPages === 0){


      this.totalPages = 1;


    }


  }









  pageSuivante(){


    if(this.page < this.totalPages){


      this.page++;


    }


  }









  pagePrecedente(){


    if(this.page > 1){


      this.page--;


    }


  }









  // =========================
  // AJOUT
  // =========================


  ajouterMatiere(){



    if(!this.matiere.nom || this.matiere.nom.trim()===''){



      this.message =

      "Le nom de la matière est obligatoire";



      return;


    }








    const existe = this.matieres.some(

      (m:any)=>

      m.nom.toLowerCase()

      ===

      this.matiere.nom.toLowerCase()


    );






    if(existe){


      this.message =

      "Cette matière existe déjà";


      return;


    }









    this.matiereService

    .ajouterMatiere(this.matiere)

    .subscribe({



      next:()=>{


        this.message =

        "Matière ajoutée avec succès";



        this.resetForm();



        this.chargerMatieres();



      },



      error:(error:any)=>{


        console.log(error);



        this.message =

        "Erreur ajout matière";


      }



    });



  }









  // =========================
  // MODIFIER
  // =========================


  modifier(matiere:any){



    this.matiere = {


      nom:matiere.nom


    };



    this.idModification = matiere.id;


    this.modification = true;



  }









  enregistrerModification(){



    if(this.idModification){



      this.matiereService

      .modifierMatiere(

        this.idModification,

        this.matiere

      )

      .subscribe({



        next:()=>{


          this.message =

          "Matière modifiée avec succès";



          this.resetForm();



          this.chargerMatieres();



        },



        error:(error:any)=>{


          console.log(error);



          this.message =

          "Erreur modification matière";


        }



      });



    }


  }









  // =========================
  // SUPPRIMER
  // =========================


  supprimer(id:number){



    if(confirm(

      "Voulez-vous supprimer cette matière ?"

    )){



      this.matiereService

      .supprimerMatiere(id)

      .subscribe({



        next:()=>{


          this.message =

          "Matière supprimée avec succès";



          this.page = 1;



          this.chargerMatieres();



        },



        error:(error:any)=>{


          console.log(error);



          this.message =

          "Erreur suppression";


        }



      });



    }



  }









  // =========================
  // RESET
  // =========================


  resetForm(){



    this.matiere = {


      nom:''


    };



    this.modification = false;


    this.idModification = null;



  }



}
