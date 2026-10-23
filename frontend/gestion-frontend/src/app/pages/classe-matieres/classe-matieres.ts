import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


import { ClasseMatiereService } from '../../services/classe-matiere';
import { ClasseService } from '../../services/classe';
import { MatiereService } from '../../services/matiere';
import { EnseignantService } from '../../services/enseignant';



@Component({

  selector: 'app-classe-matieres',

  standalone:true,

  imports:[
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl:'./classe-matieres.html',

  styleUrl:'./classe-matieres.css'

})


export class ClasseMatieres implements OnInit {


  affectations:any[]=[];

  classes:any[]=[];

  matieres:any[]=[];

  enseignants:any[]=[];


  message:string='';

  recherche:string='';



  modification:boolean=false;

  idModification:number|null=null;



  // PAGINATION

  page:number = 1;

  taillePage:number = 10;




  affectation:any={

    classe_id:null,

    matiere_id:null,

    enseignant_id:null,

    coefficient:1

  };







  constructor(

    private classeMatiereService:ClasseMatiereService,

    private classeService:ClasseService,

    private matiereService:MatiereService,

    private enseignantService:EnseignantService,

    private cd:ChangeDetectorRef,

    private router:Router

  ){}





  ngOnInit(){

    this.chargerAffectations();

    this.chargerClasses();

    this.chargerMatieres();

    this.chargerEnseignants();

  }







  retourDashboard(){

    this.router.navigate(['/dashboard']);

  }









  chargerAffectations(){


    this.classeMatiereService
    .getClasseMatieres()

    .subscribe({

      next:(data:any)=>{


        this.affectations =
        Array.isArray(data)

        ? [...data]

        : [];



        this.page = 1;


        this.cd.detectChanges();


      },


      error:(err:any)=>{


        console.log(err);

        this.message =
        "Erreur chargement affectations";


      }


    });


  }








  chargerClasses(){


    this.classeService.getClasses()

    .subscribe({

      next:(data:any)=>{


        this.classes =
        Array.isArray(data)

        ? data

        : [];


      },


      error:(err:any)=>{

        console.log(err);

      }

    });


  }








  chargerMatieres(){


    this.matiereService.getMatieres()

    .subscribe({

      next:(data:any)=>{


        this.matieres =
        Array.isArray(data)

        ? data

        : [];


      },


      error:(err:any)=>{

        console.log(err);

      }

    });


  }








  chargerEnseignants(){


    this.enseignantService.getEnseignants()

    .subscribe({

      next:(data:any)=>{


        this.enseignants =
        Array.isArray(data)

        ? data

        : [];


      },


      error:(err:any)=>{

        console.log(err);

      }

    });


  }









  get affectationsFiltrees(){


    const texte =
    this.recherche
    .toLowerCase()
    .trim();



    let resultat = this.affectations;




    if(texte){


      resultat =
      this.affectations.filter(a=>{


        return (

          a.classe?.nom
          ?.toLowerCase()
          .includes(texte)


          ||

          a.matiere?.nom
          ?.toLowerCase()
          .includes(texte)


          ||

          a.enseignant?.nom
          ?.toLowerCase()
          .includes(texte)

        );


      });


    }





    const debut =
    (this.page-1)
    *
    this.taillePage;




    return resultat.slice(

      debut,

      debut + this.taillePage

    );


  }









  get totalPages(){


    const texte =
    this.recherche
    .toLowerCase()
    .trim();



    let resultat=this.affectations;



    if(texte){


      resultat =
      this.affectations.filter(a=>{


        return (

          a.classe?.nom
          ?.toLowerCase()
          .includes(texte)


          ||

          a.matiere?.nom
          ?.toLowerCase()
          .includes(texte)


          ||

          a.enseignant?.nom
          ?.toLowerCase()
          .includes(texte)

        );


      });


    }



    return Math.ceil(

      resultat.length /

      this.taillePage

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









  ajouter(){


    if(


      !this.affectation.classe_id ||

      !this.affectation.matiere_id ||

      !this.affectation.enseignant_id


    ){


      this.message =
      "Veuillez remplir tous les champs";


      return;


    }




    this.classeMatiereService

    .ajouterClasseMatiere(this.affectation)

    .subscribe({


      next:()=>{


        this.message =
        "Affectation ajoutée avec succès";


        this.reset();


        this.chargerAffectations();


      },


      error:(err:any)=>{


        console.log(err);

        this.message =
        "Erreur ajout";


      }


    });


  }









  modifier(item:any){


    this.affectation={


      classe_id:item.classe_id,

      matiere_id:item.matiere_id,

      enseignant_id:item.enseignant_id,

      coefficient:item.coefficient

    };



    this.idModification =
    item.id;


    this.modification=true;


  }









  enregistrerModification(){



    if(this.idModification === null){

      return;

    }





    this.classeMatiereService

    .modifierClasseMatiere(

      this.idModification,

      this.affectation

    )


    .subscribe({


      next:()=>{


        this.message =
        "Modification réussie";


        this.reset();


        this.chargerAffectations();


      },


      error:(err:any)=>{


        console.log(err);


        this.message =
        "Erreur modification";


      }


    });


  }









  supprimer(id:number){


    if(confirm(
      "Voulez-vous supprimer cette affectation ?"
    )){


      this.classeMatiereService

      .supprimerClasseMatiere(id)

      .subscribe({


        next:()=>{


          this.message =
          "Suppression réussie";


          this.chargerAffectations();


        },


        error:(err:any)=>{


          console.log(err);


          this.message =
          "Erreur suppression";


        }


      });


    }


  }









  reset(){


    this.affectation={


      classe_id:null,

      matiere_id:null,

      enseignant_id:null,

      coefficient:1


    };



    this.modification=false;


    this.idModification=null;


  }



}