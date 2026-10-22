import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ClasseService } from '../../services/classe';


@Component({

  selector: 'app-classes',

  standalone:true,

  imports:[

    CommonModule,

    FormsModule,

    RouterLink

  ],

  templateUrl:'./classes.html',

  styleUrl:'./classes.css'

})


export class Classes implements OnInit {



  classes:any[] = [];


  recherche = '';


  message = '';



  modification = false;


  idModification:any = null;





  classe = {


    nom:'',


    niveau:''


  };








  constructor(

    private classeService:ClasseService,

    private cd:ChangeDetectorRef,

    private router:Router

  ){}





  ngOnInit(){


    this.chargerClasses();


  }









  chargerClasses(){


    this.classeService.getClasses()

    .subscribe({



      next:(data:any)=>{


        console.log(

          "Classes reçues :",

          data

        );



        this.classes = Array.isArray(data)


          ? [...data]


          : [];




        console.log(

          "Nombre classes :",

          this.classes.length

        );




        this.cd.detectChanges();



      },





      error:(error:any)=>{


        console.log(

          "Erreur chargement classes :",

          error

        );



        this.message =

        "Erreur chargement classes";


      }



    });



  }









  get classesFiltrees(){



    const texte = this.recherche

    .toLowerCase()

    .trim();





    if(!texte){


      return this.classes;


    }






    return this.classes.filter(classe=>{


      return (


        classe.nom

        .toLowerCase()

        .includes(texte)



        ||



        classe.niveau

        .toLowerCase()

        .includes(texte)



      );



    });



  }









  ajouterClasse(){



    console.log(

      "Données envoyées :",

      this.classe

    );





    if(


      !this.classe.nom ||


      !this.classe.niveau



    ){



      this.message =

      "Veuillez remplir tous les champs";



      return;


    }








    this.classeService

    .ajouterClasse(this.classe)



    .subscribe({




      next:(response:any)=>{


        console.log(response);



        this.message =

        "Classe ajoutée avec succès";



        this.resetForm();



        this.chargerClasses();




      },





      error:(error:any)=>{


        console.log(

          "Erreur Laravel :",

          error.error

        );



        this.message =

        "Erreur ajout classe";



      }





    });





  }









  modifier(classe:any){



    this.classe = {


      nom:classe.nom,


      niveau:classe.niveau


    };




    this.idModification = classe.id;



    this.modification = true;



  }









  enregistrerModification(){



    this.classeService

    .modifierClasse(


      this.idModification,


      this.classe


    )



    .subscribe({



      next:(response:any)=>{


        console.log(response);



        this.message =

        "Classe modifiée avec succès";



        this.resetForm();



        this.chargerClasses();



      },





      error:(error:any)=>{


        console.log(

          "Erreur Laravel :",

          error.error

        );



        this.message =

        "Erreur modification";


      }





    });



  }









  supprimer(id:number){



    if(confirm(

      "Voulez-vous supprimer cette classe ?"

    )){



      this.classeService

      .supprimerClasse(id)



      .subscribe({



        next:(response:any)=>{


          console.log(response);



          this.message =

          "Classe supprimée avec succès";



          this.chargerClasses();



        },





        error:(error:any)=>{


          console.log(error);



          this.message =

          "Erreur suppression";



        }





      });



    }



  }









  retourDashboard(){



    this.router.navigate(['/dashboard']);



  }









  resetForm(){



    this.classe = {


      nom:'',


      niveau:''


    };



    this.modification=false;



    this.idModification=null;



  }



}