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


  recherche:string = '';


  message:string = '';



  modification:boolean = false;


  idModification:number|null = null;






  classe:any = {


    nom:'',

    niveau:''


  };





  // ===========================
  // PAGINATION
  // ===========================


  page:number = 1;


  elementsParPage:number = 10;


  totalPages:number = 0;









  constructor(


    private classeService:ClasseService,


    private cd:ChangeDetectorRef,


    private router:Router


  ){}





  ngOnInit(){


    this.chargerClasses();


  }









  // ===========================
  // CHARGEMENT DES CLASSES
  // ===========================


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



        this.calculerPages();



        this.cd.detectChanges();



      },



      error:(error:any)=>{


        console.log(error);



        this.message =

        "Erreur chargement classes";


      }



    });



  }









  // ===========================
  // RECHERCHE
  // ===========================


  get classesFiltrees(){



    const texte = this.recherche

    .toLowerCase()

    .trim();





    let resultat = this.classes;



    if(texte){


      resultat = this.classes.filter((classe:any)=>{


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



    return resultat;


  }









  // ===========================
  // PAGINATION RESULTAT
  // ===========================


  get classesPaginees(){



    const debut =

    (this.page - 1) *

    this.elementsParPage;



    return this.classesFiltrees.slice(


      debut,


      debut + this.elementsParPage


    );


  }









  calculerPages(){



    this.totalPages = Math.ceil(


      this.classesFiltrees.length /


      this.elementsParPage


    );



    if(this.totalPages === 0){


      this.totalPages = 1;


    }



    if(this.page > this.totalPages){


      this.page = this.totalPages;


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









  // ===========================
  // AJOUT
  // ===========================


  ajouterClasse(){



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



      next:()=>{


        this.message =

        "Classe ajoutée avec succès";



        this.resetForm();



        this.chargerClasses();



      },



      error:(error:any)=>{


        console.log(error);



        this.message =

        "Erreur ajout classe";


      }



    });



  }









  // ===========================
  // MODIFIER
  // ===========================


  modifier(classe:any){



    this.classe = {


      nom:classe.nom,


      niveau:classe.niveau


    };



    this.idModification = classe.id;



    this.modification = true;



  }









  enregistrerModification(){



    if(this.idModification){



      this.classeService

      .modifierClasse(


        this.idModification,


        this.classe


      )


      .subscribe({



        next:()=>{


          this.message =

          "Classe modifiée avec succès";



          this.resetForm();



          this.chargerClasses();



        },



        error:(error:any)=>{


          console.log(error);



          this.message =

          "Erreur modification";


        }



      });



    }



  }









  // ===========================
  // SUPPRESSION
  // ===========================


  supprimer(id:number){



    if(confirm(

      "Voulez-vous supprimer cette classe ?"

    )){



      this.classeService

      .supprimerClasse(id)


      .subscribe({



        next:()=>{


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









  // ===========================
  // RETOUR DASHBOARD
  // ===========================


  retourDashboard(){


    this.router.navigate(['/dashboard']);


  }









  // ===========================
  // RESET
  // ===========================


  resetForm(){



    this.classe = {


      nom:'',


      niveau:''


    };



    this.modification = false;


    this.idModification = null;



  }



}