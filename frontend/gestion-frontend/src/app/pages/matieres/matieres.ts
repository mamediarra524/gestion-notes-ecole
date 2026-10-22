import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatiereService } from '../../services/matiere';



@Component({

  selector: 'app-matieres',

  standalone: true,

  imports: [

    CommonModule,

    FormsModule,

    RouterLink

  ],

  templateUrl: './matieres.html',

  styleUrl: './matieres.css'

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







  constructor(

    private matiereService:MatiereService,

    private cd:ChangeDetectorRef

  ){}





  ngOnInit(){


    this.chargerMatieres();


  }









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


        // Force l'affichage après rechargement

        this.cd.detectChanges();



      },



      error:(error:any)=>{


        console.log(error);


        this.message =

        "Erreur chargement matières";


      }



    });


  }









  get matieresFiltrees(){



    const texte =

    this.recherche

    .toLowerCase()

    .trim();





    if(!texte){


      return this.matieres;


    }






    return this.matieres.filter((matiere:any)=>



      matiere.nom

      .toLowerCase()

      .includes(texte)



    );



  }









  ajouterMatiere(){



    if(!this.matiere.nom){



      this.message =

      "Le nom de la matière est obligatoire";



      return;


    }







    this.matiereService

    .ajouterMatiere(this.matiere)

    .subscribe({



      next:(response:any)=>{


        console.log(

          "Réponse ajout :",

          response

        );



        this.message =

        "Matière ajoutée avec succès";



        this.resetForm();



        // Recharge la liste après ajout

        this.chargerMatieres();



      },



      error:(error:any)=>{


        console.log(error);


        this.message =

        "Erreur ajout matière";


      }



    });



  }









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









  resetForm(){



    this.matiere = {


      nom:''


    };



    this.modification = false;


    this.idModification = null;



  }



}
