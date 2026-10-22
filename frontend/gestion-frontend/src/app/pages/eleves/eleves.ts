import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { EleveService } from '../../services/eleve';
import { ClasseService } from '../../services/classe';


@Component({
  selector: 'app-eleves',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe
  ],
  templateUrl: './eleves.html',
  styleUrl: './eleves.css'
})
export class Eleves implements OnInit {


  eleves:any[] = [];

  classes:any[] = [];

  message = '';

  recherche = '';

  modification = false;

  idModification:any = null;



  eleve = {

    nom: '',

    prenom: '',

    date_naissance: '',

    classe_id: null

  };





  constructor(

    private eleveService: EleveService,

    private classeService: ClasseService,

    private cd: ChangeDetectorRef,

    private router: Router

  ){}





  ngOnInit(){


    this.chargerEleves();

    this.chargerClasses();


  }







  chargerEleves(){


    this.eleveService.getEleves()

    .subscribe({

      next:(data:any)=>{


        console.log(
          "Élèves reçus :",
          data
        );


        this.eleves = Array.isArray(data)

          ? [...data]

          : [];



        console.log(
          "Nombre élèves :",
          this.eleves.length
        );



        this.cd.detectChanges();



      },


      error:(error:any)=>{


        console.log(
          "Erreur chargement élèves :",
          error
        );


        this.message =
        "Erreur chargement élèves";


      }


    });


  }








  chargerClasses(){


    this.classeService.getClasses()

    .subscribe({

      next:(data:any)=>{


        console.log(
          "Classes :",
          data
        );



        this.classes = Array.isArray(data)

          ? data

          : [];



        this.cd.detectChanges();



      },


      error:(error:any)=>{


        console.log(
          "Erreur classes :",
          error
        );


      }


    });


  }







  get elevesFiltres(){


    const texte = this.recherche
    .toLowerCase()
    .trim();



    if(!texte){


      return this.eleves;


    }



    return this.eleves.filter(eleve => {


      return (

        eleve.nom
        .toLowerCase()
        .includes(texte)


        ||

        eleve.prenom
        .toLowerCase()
        .includes(texte)

      );


    });


  }








  ajouterEleve(){


    console.log(
      "Données envoyées :",
      this.eleve
    );



    if(

      !this.eleve.nom ||

      !this.eleve.prenom ||

      !this.eleve.date_naissance ||

      !this.eleve.classe_id

    ){


      this.message =
      "Veuillez remplir tous les champs";


      return;


    }





    this.eleveService
    .ajouterEleve(this.eleve)

    .subscribe({


      next:(response:any)=>{


        console.log(response);



        this.message =
        "Élève ajouté avec succès";



        this.resetForm();



        this.chargerEleves();



      },



      error:(error:any)=>{


        console.log(
          "Erreur Laravel :",
          error.error
        );



        this.message =
        "Erreur ajout élève";


      }


    });


  }








  modifier(eleve:any){


    this.eleve = {


      nom: eleve.nom,


      prenom: eleve.prenom,


      date_naissance:
      eleve.date_naissance.substring(0,10),


      classe_id:
      eleve.classe_id


    };



    this.idModification = eleve.id;


    this.modification = true;



  }








  enregistrerModification(){


    this.eleveService
    .modifierEleve(

      this.idModification,

      this.eleve

    )

    .subscribe({


      next:(response:any)=>{


        console.log(response);



        this.message =
        "Élève modifié avec succès";



        this.resetForm();



        this.chargerEleves();



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
      "Voulez-vous supprimer cet élève ?"
    )){


      this.eleveService
      .supprimerEleve(id)

      .subscribe({


        next:(response:any)=>{


          console.log(response);



          this.message =
          "Élève supprimé avec succès";



          this.chargerEleves();



        },


        error:(error:any)=>{


          console.log(error);



          this.message =
          "Erreur suppression";


        }


      });


    }


  }








  // Retour vers le Dashboard

  retourDashboard(){


    this.router.navigate(['/dashboard']);


  }








  resetForm(){


    this.eleve = {


      nom:'',


      prenom:'',


      date_naissance:'',


      classe_id:null


    };



    this.modification = false;


    this.idModification = null;



  }



}