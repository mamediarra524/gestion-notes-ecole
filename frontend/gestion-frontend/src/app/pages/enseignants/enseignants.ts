import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { EnseignantService } from '../../services/enseignant';


@Component({

  selector:'app-enseignants',

  standalone:true,

  imports:[

    CommonModule,
    FormsModule,
    RouterLink

  ],

  templateUrl:'./enseignants.html',

  styleUrl:'./enseignants.css'

})


export class Enseignants implements OnInit {


  enseignants:any[] = [];

  message:string = '';

  recherche:string = '';

  modification:boolean = false;

  idModification:number|null = null;



  // =========================
  // PAGINATION
  // =========================

  page:number = 1;

  elementsParPage:number = 10;





  // =========================
  // FORMULAIRE
  // =========================

  enseignant:any = {

    nom:'',
    prenom:'',
    email:'',
    telephone:'',
    password:'',
    password_confirmation:''

  };







  constructor(

    private enseignantService:EnseignantService,

    private cd:ChangeDetectorRef

  ){}





  ngOnInit(){

    this.chargerEnseignants();

  }








  // =========================
  // CHARGER ENSEIGNANTS
  // =========================


  chargerEnseignants(){


    this.enseignantService

    .getEnseignants()

    .subscribe({


      next:(data:any)=>{


        console.log(
          "Enseignants reçus :",
          data
        );


        this.enseignants = [...data];


        this.page = 1;


        this.cd.detectChanges();


      },



      error:(error:any)=>{


        console.log(error);


        this.message =
        "Erreur chargement enseignants";


      }


    });


  }









  // =========================
  // FILTRE + PAGINATION
  // =========================


  get enseignantsFiltres(){


    const texte = this.recherche
    .toLowerCase()
    .trim();



    let resultat = this.enseignants;



    if(texte){


      resultat = this.enseignants.filter((e:any)=>


        e.nom.toLowerCase().includes(texte)

        ||

        e.prenom.toLowerCase().includes(texte)

        ||

        e.email.toLowerCase().includes(texte)


      );


    }





    const debut =

    (this.page - 1)

    *

    this.elementsParPage;



    return resultat.slice(

      debut,

      debut + this.elementsParPage

    );


  }








  get totalPages(){


    return Math.ceil(

      this.enseignants.length /

      this.elementsParPage

    );


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
  // AJOUT ENSEIGNANT
  // =========================


  ajouterEnseignant(){



    if(


      !this.enseignant.nom ||

      !this.enseignant.prenom ||

      !this.enseignant.email ||

      !this.enseignant.password


    ){


      this.message =
      "Veuillez remplir tous les champs obligatoires";


      return;


    }






    if(

      this.enseignant.password !==

      this.enseignant.password_confirmation

    ){


      this.message =
      "Les mots de passe ne correspondent pas";


      return;


    }







    this.enseignantService

    .ajouterEnseignant(

      this.enseignant

    )

    .subscribe({



      next:(response:any)=>{


        console.log(response);



        this.message =
        "Enseignant ajouté avec succès";



        this.resetForm();



        this.chargerEnseignants();



      },





      error:(error:any)=>{


        console.log(error);



        this.message =
        "Erreur ajout enseignant";


      }



    });


  }









  // =========================
  // MODIFIER
  // =========================


  modifier(e:any){


    this.enseignant = {


      nom:e.nom,

      prenom:e.prenom,

      email:e.email,

      telephone:e.telephone,

      password:'',

      password_confirmation:''


    };



    this.idModification = e.id;


    this.modification = true;


  }









  enregistrerModification(){


    if(this.idModification){



      this.enseignantService

      .modifierEnseignant(

        this.idModification,

        this.enseignant

      )

      .subscribe({



        next:()=>{


          this.message =
          "Enseignant modifié avec succès";



          this.resetForm();


          this.chargerEnseignants();



        },




        error:(error:any)=>{


          console.log(error);



          this.message =
          "Erreur modification enseignant";


        }



      });


    }


  }









  // =========================
  // RESET MOT DE PASSE
  // =========================


  resetPassword(e:any){



    if(confirm(

      "Réinitialiser le mot de passe de "
      + e.prenom
      + " "
      + e.nom
      + " ?"

    )){



      this.enseignantService

      .resetPassword(e.id)

      .subscribe({



        next:(response:any)=>{



          alert(

            "Nouveau mot de passe : "

            + response.password

          );



        },




        error:(error:any)=>{


          console.log(error);



          this.message =

          "Erreur réinitialisation mot de passe";


        }



      });



    }



  }









  // =========================
  // SUPPRIMER
  // =========================


  supprimer(id:number){



    if(confirm(

      "Voulez-vous supprimer cet enseignant ?"

    )){



      this.enseignantService

      .supprimerEnseignant(id)

      .subscribe({



        next:()=>{


          this.message =
          "Enseignant supprimé avec succès";



          this.chargerEnseignants();



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
  // RESET FORMULAIRE
  // =========================


  resetForm(){



    this.enseignant = {


      nom:'',

      prenom:'',

      email:'',

      telephone:'',

      password:'',

      password_confirmation:''


    };



    this.modification = false;


    this.idModification = null;


  }



}