import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


import { EvaluationService } from '../../services/evaluation';
import { MatiereService } from '../../services/matiere';



@Component({

  selector:'app-evaluations',

  standalone:true,

  imports:[

    CommonModule,

    FormsModule

  ],

  templateUrl:'./evaluations.html',

  styleUrl:'./evaluations.css'

})


export class Evaluations implements OnInit {



  @ViewChild('formulaire')

  formulaire!: ElementRef;





  evaluations:any[]=[];


  matieres:any[]=[];


  message:string='';



  modification:boolean=false;


  idModification:number|null=null;





  evaluation:any={


    matiere_id:'',

    libelle:'',

    date:'',

    coefficient:1


  };







  constructor(

    private evaluationService:EvaluationService,

    private matiereService:MatiereService,

    private cd:ChangeDetectorRef,

    private router:Router

  ){}





  ngOnInit(){


    this.chargerEvaluations();

    this.chargerMatieres();


  }









  retourDashboard(){


    this.router.navigate([

      '/dashboard'

    ]);


  }









  chargerEvaluations(){


    this.evaluationService

    .getEvaluations()

    .subscribe({


      next:(data:any)=>{


        console.log(

          "EVALUATIONS :",

          data

        );


        this.evaluations=[...data];


        this.cd.detectChanges();


      },


      error:(err)=>{


        console.log(err);


        this.message=

        "Erreur chargement évaluations";


      }


    });


  }









  chargerMatieres(){


    this.matiereService

    .getMatieres()

    .subscribe({


      next:(data:any)=>{


        this.matieres=[...data];


        this.cd.detectChanges();


      },


      error:(err)=>{


        console.log(err);


      }


    });


  }









  ajouterEvaluation(){


    this.evaluationService

    .ajouterEvaluation(

      this.evaluation

    )

    .subscribe({


      next:()=>{


        this.message=

        "Evaluation ajoutée avec succès";


        this.resetForm();

        this.chargerEvaluations();


      },


      error:(err)=>{


        console.log(err);


        this.message=

        "Erreur ajout évaluation";


      }


    });


  }









  modifier(e:any){



    this.evaluation={


      matiere_id:e.matiere_id,

      libelle:e.libelle,

      date:e.date,

      coefficient:e.coefficient


    };



    this.idModification=e.id;


    this.modification=true;



    setTimeout(()=>{


      if(this.formulaire){


        this.formulaire.nativeElement.scrollIntoView({

          behavior:'smooth',

          block:'start'

        });


      }


    },100);



  }









  enregistrerModification(){



    if(this.idModification===null){

      return;

    }





    this.evaluationService

    .modifierEvaluation(

      this.idModification,

      this.evaluation

    )

    .subscribe({


      next:()=>{


        this.message=

        "Evaluation modifiée avec succès";


        this.resetForm();


        this.chargerEvaluations();


      },


      error:(err)=>{


        console.log(err);


        this.message=

        "Erreur modification";


      }


    });



  }









  supprimer(id:number){



    if(confirm(

      "Supprimer cette évaluation ?"

    )){


      this.evaluationService

      .supprimerEvaluation(id)

      .subscribe({


        next:()=>{


          this.message=

          "Evaluation supprimée";


          this.chargerEvaluations();


        },


        error:(err)=>{


          console.log(err);


          this.message=

          "Erreur suppression";


        }


      });


    }


  }









  resetForm(){



    this.evaluation={


      matiere_id:'',

      libelle:'',

      date:'',

      coefficient:1


    };



    this.modification=false;


    this.idModification=null;



    window.scrollTo({

      top:0,

      behavior:'smooth'

    });


  }



}
