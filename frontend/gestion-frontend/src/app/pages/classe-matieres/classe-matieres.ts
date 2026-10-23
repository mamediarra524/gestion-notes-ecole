import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


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



  modification:boolean=false;


  idModification:number|null=null;





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


    private cd:ChangeDetectorRef


  ){}





  ngOnInit(){


    this.chargerAffectations();


    this.chargerClasses();


    this.chargerMatieres();


    this.chargerEnseignants();


  }









  chargerAffectations(){



    this.classeMatiereService.getClasseMatieres()


    .subscribe({



      next:(data:any)=>{


        console.log(
          "Affectations :",
          data
        );



        this.affectations=data;



        this.cd.detectChanges();



      },



      error:(err:any)=>{


        console.log(err);


        this.message=
        "Erreur chargement affectations";


      }



    });



  }









  chargerClasses(){



    this.classeService.getClasses()


    .subscribe({



      next:(data:any)=>{


        this.classes=data;


        this.cd.detectChanges();


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


        this.matieres=data;


        this.cd.detectChanges();


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


        this.enseignants=data;


        this.cd.detectChanges();


      },



      error:(err:any)=>{


        console.log(err);


      }



    });



  }









  ajouter(){



    if(

      !this.affectation.classe_id ||

      !this.affectation.matiere_id ||

      !this.affectation.enseignant_id

    ){


      this.message=
      "Veuillez remplir tous les champs";


      return;


    }





    if(

      this.affectation.coefficient < 1 ||

      this.affectation.coefficient > 10

    ){


      this.message=
      "Le coefficient doit être entre 1 et 10";


      return;


    }






    this.classeMatiereService.ajouterClasseMatiere(

      this.affectation

    )


    .subscribe({



      next:()=>{


        this.message=
        "Affectation ajoutée avec succès";



        this.reset();



        this.chargerAffectations();



        this.cd.detectChanges();



      },



      error:(err:any)=>{


        console.log(err);


        this.message=
        "Erreur lors de l'ajout";


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



    this.idModification=item.id;


    this.modification=true;



  }









  enregistrerModification(){



    if(this.idModification){



      this.classeMatiereService.modifierClasseMatiere(

        this.idModification,

        this.affectation

      )

      .subscribe({



        next:()=>{


          this.message=
          "Modification réussie";



          this.reset();



          this.chargerAffectations();



          this.cd.detectChanges();



        },



        error:(err:any)=>{


          console.log(err);


          this.message=
          "Erreur modification";


        }



      });



    }



  }









  supprimer(id:number){



    if(confirm(
      "Voulez-vous supprimer cette affectation ?"
    )){



      this.classeMatiereService.supprimerClasseMatiere(id)


      .subscribe({



        next:()=>{


          this.message=
          "Suppression réussie";



          this.chargerAffectations();



          this.cd.detectChanges();



        },



        error:(err:any)=>{


          console.log(err);


          this.message=
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