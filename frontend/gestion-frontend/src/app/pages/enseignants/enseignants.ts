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








  enseignant:any = {


    nom:'',

    prenom:'',

    email:'',

    telephone:''


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
  // RECHERCHE + PAGINATION
  // =========================


  get enseignantsFiltres(){



    const texte =

    this.recherche

    .toLowerCase()

    .trim();




    let resultat = this.enseignants;






    if(texte){



      resultat = this.enseignants.filter((e:any)=>



        e.nom

        .toLowerCase()

        .includes(texte)



        ||



        e.prenom

        .toLowerCase()

        .includes(texte)



        ||



        e.email

        .toLowerCase()

        .includes(texte)



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
  // AJOUT
  // =========================


  ajouterEnseignant(){



    if(


      !this.enseignant.nom ||


      !this.enseignant.prenom ||


      !this.enseignant.email


    ){



      this.message =

      "Veuillez remplir les champs obligatoires";



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


      telephone:e.telephone



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


      telephone:''



    };



    this.modification=false;



    this.idModification=null;



  }



}