import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { EleveService } from '../../services/eleve';
import { ClasseService } from '../../services/classe';



@Component({

  selector:'app-eleves',

  standalone:true,

  imports:[

    CommonModule,

    FormsModule,

    DatePipe

  ],

  templateUrl:'./eleves.html',

  styleUrl:'./eleves.css'

})


export class Eleves implements OnInit {



  eleves:any[]=[];

  classes:any[]=[];

  message:string='';

  recherche:string='';



  modification:boolean=false;

  idModification:number|null=null;



  page:number=1;

  elementsParPage:number=10;





  eleve:any={

    nom:'',

    prenom:'',

    date_naissance:'',

    classe_id:null

  };





  constructor(

    private eleveService:EleveService,

    private classeService:ClasseService,

    private cd:ChangeDetectorRef,

    private router:Router

  ){}





  ngOnInit(){


    const user = JSON.parse(

      localStorage.getItem('user') || '{}'

    );





    // ADMIN uniquement

    if(user.role !== 'ADMIN'){


      this.message =

      "Accès réservé à l'administration";


      return;


    }





    this.chargerEleves();


    this.chargerClasses();


  }









  // ===============================
  // CHARGER LES ELEVES
  // ===============================


  chargerEleves(){


    this.eleveService

    .getEleves()

    .subscribe({



      next:(data:any)=>{


        console.log(

          "Élèves reçus :",

          data

        );





        this.eleves = Array.isArray(data)

        ? [...data]

        : [];





        this.page=1;


        this.cd.detectChanges();


      },



      error:(err)=>{


        console.log(err);


        this.message=

        "Erreur chargement élèves";


      }



    });



  }









  // ===============================
  // CHARGER CLASSES
  // ===============================


  chargerClasses(){



    this.classeService

    .getClasses()

    .subscribe({



      next:(data:any)=>{


        this.classes = Array.isArray(data)

        ? [...data]

        : [];



        this.cd.detectChanges();


      },



      error:(err)=>{


        console.log(err);


      }



    });



  }









  // ===============================
  // RECHERCHE + PAGINATION
  // ===============================


  get elevesFiltres(){


    let resultat=[...this.eleves];



    const texte =

    this.recherche

    .toLowerCase()

    .trim();





    if(texte){



      resultat=resultat.filter(

        (e:any)=>

        e.nom

        .toLowerCase()

        .includes(texte)



        ||

        e.prenom

        .toLowerCase()

        .includes(texte)

      );

    }







    const debut =

    (this.page-1)

    *

    this.elementsParPage;





    return resultat.slice(

      debut,

      debut + this.elementsParPage

    );



  }









  get totalPages(){



    return Math.ceil(

      this.eleves.length /

      this.elementsParPage

    ) || 1;


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









  // ===============================
  // AJOUT
  // ===============================


  ajouterEleve(){



    this.eleveService

    .ajouterEleve(this.eleve)

    .subscribe({



      next:()=>{


        this.message=

        "Élève ajouté avec succès";


        this.resetForm();


        this.chargerEleves();


      },



      error:(err)=>{


        console.log(err);


        this.message=

        "Erreur ajout élève";


      }



    });



  }









  // ===============================
  // MODIFICATION
  // ===============================


  modifier(eleve:any){



    this.eleve={


      nom:eleve.nom,


      prenom:eleve.prenom,


      date_naissance:

      eleve.date_naissance.substring(0,10),


      classe_id:eleve.classe_id


    };





    this.idModification=

    eleve.id;



    this.modification=true;


  }









  enregistrerModification(){



    if(this.idModification===null)

    return;





    this.eleveService

    .modifierEleve(

      this.idModification,

      this.eleve

    )

    .subscribe({



      next:()=>{


        this.message=

        "Élève modifié avec succès";


        this.resetForm();


        this.chargerEleves();


      },



      error:(err)=>{


        console.log(err);


        this.message=

        "Erreur modification";


      }



    });



  }









  // ===============================
  // SUPPRESSION
  // ===============================


  supprimer(id:number){



    if(confirm(

      "Supprimer cet élève ?"

    )){


      this.eleveService

      .supprimerEleve(id)

      .subscribe({



        next:()=>{


          this.message=

          "Élève supprimé";


          this.chargerEleves();


        }



      });



    }



  }









  resetForm(){



    this.eleve={


      nom:'',

      prenom:'',

      date_naissance:'',

      classe_id:null


    };



    this.modification=false;


    this.idModification=null;


  }









  retourDashboard(){


    this.router.navigate([

      '/dashboard'

    ]);


  }



}