import { 
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ClasseService } from '../../services/classe';



@Component({

  selector:'app-classes',

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



  @ViewChild('messageBox') messageBox!: ElementRef;



  classes:any[] = [];


  recherche:string = '';


  message:string = '';



  modification:boolean = false;


  idModification:number|null = null;



  classe:any = {

    nom:'',

    niveau:''

  };




  // PAGINATION

  page:number = 1;

  elementsParPage:number = 10;

  totalPages:number = 1;






  constructor(

    private classeService:ClasseService,

    private cd:ChangeDetectorRef,

    private router:Router

  ){}





  ngOnInit(){

    this.chargerClasses();

  }







  // =========================
  // CHARGER LES CLASSES
  // =========================


  chargerClasses(){


    this.classeService.getClasses()

    .subscribe({


      next:(data:any)=>{


        console.log(
          "Classes chargées :",
          data
        );


        this.classes = Array.isArray(data)

        ? data

        : [];



        this.calculerPages();


        this.cd.detectChanges();


      },



      error:(err)=>{


        console.log(
          "Erreur chargement :",
          err
        );


        this.message =
        "Erreur chargement classes";


        this.scrollMessage();


      }


    });


  }








  // =========================
  // RECHERCHE
  // =========================


  get classesFiltrees(){


    const texte = this.recherche

    .toLowerCase()

    .trim();



    if(!texte){

      return this.classes;

    }




    return this.classes.filter((c:any)=>{


      return (

        c.nom
        .toLowerCase()
        .includes(texte)


        ||

        c.niveau
        .toLowerCase()
        .includes(texte)

      );


    });


  }









  // =========================
  // PAGINATION
  // =========================


  get classesPaginees(){


    const debut =

    (this.page - 1)

    *

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


    if(this.totalPages < 1){

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


  ajouterClasse(){



    console.log(
      "Ajout classe",
      this.classe
    );



    if(
      !this.classe.nom ||
      !this.classe.niveau
    ){


      this.message =
      "Veuillez remplir tous les champs";


      this.scrollMessage();


      return;

    }





    this.classeService

    .ajouterClasse(this.classe)

    .subscribe({



      next:(res:any)=>{


        console.log(
          "Réponse ajout :",
          res
        );



        this.message =

        res.message ||

        "Classe ajoutée avec succès";



        this.resetForm();


        this.chargerClasses();


        this.scrollMessage();



      },



      error:(err)=>{


        console.log(err);


        this.message =
        "Erreur ajout classe";


        this.scrollMessage();


      }



    });



  }









  // =========================
  // PREPARER MODIFICATION
  // =========================


  modifier(classe:any){



    console.log(
      "Classe choisie :",
      classe
    );



    this.classe = {


      nom:classe.nom,


      niveau:classe.niveau


    };



    this.idModification = classe.id;



    console.log(
      "ID modification :",
      this.idModification
    );


    this.modification = true;



    window.scrollTo({

      top:0,

      behavior:'smooth'

    });


  }









  // =========================
  // SAUVEGARDER MODIFICATION
  // =========================


  enregistrerModification(){



    console.log(
      "Modification lancée"
    );


    console.log(
      "ID :",
      this.idModification
    );


    console.log(
      "Données :",
      this.classe
    );



    if(this.idModification === null){

      return;

    }






    this.classeService

    .modifierClasse(

      this.idModification,

      this.classe

    )

    .subscribe({



      next:(res:any)=>{


        console.log(
          "Réponse API :",
          res
        );



        this.message =

        res.message ||

        "Classe modifiée avec succès";



        this.resetForm();


        this.chargerClasses();


        this.scrollMessage();



      },



      error:(err)=>{


        console.log(
          "Erreur modification :",
          err
        );



        this.message =
        "Erreur modification";


        this.scrollMessage();



      }



    });



  }









  // =========================
  // SUPPRESSION
  // =========================


  supprimer(id:number){



    console.log(
      "Suppression ID :",
      id
    );



    if(!confirm(

      "Voulez-vous supprimer cette classe ?"

    )){

      return;

    }





    this.classeService

    .supprimerClasse(id)

    .subscribe({



      next:(res:any)=>{


        console.log(
          "Réponse suppression :",
          res
        );



        this.message =

        res.message ||

        "Classe supprimée avec succès";



        this.chargerClasses();


        this.scrollMessage();



      },



      error:(err)=>{


        console.log(
          "Erreur suppression :",
          err
        );



        this.message =
        "Erreur suppression";


        this.scrollMessage();


      }



    });



  }









  // =========================
  // SCROLL MESSAGE
  // =========================


  scrollMessage(){


    setTimeout(()=>{


      if(this.messageBox){


        this.messageBox.nativeElement

        .scrollIntoView({

          behavior:'smooth',

          block:'center'

        });


      }


    },300);


  }









  // =========================
  // RETOUR DASHBOARD
  // =========================


  retourDashboard(){


    this.router.navigate(['/dashboard']);


  }









  // =========================
  // RESET
  // =========================


  resetForm(){


    this.classe = {

      nom:'',

      niveau:''

    };



    this.modification = false;



    this.idModification = null;



  }



}