import { 
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatiereService } from '../../services/matiere';



@Component({

  selector: 'app-matieres',

  standalone:true,

  imports:[

    CommonModule,

    FormsModule,

    RouterLink

  ],

  templateUrl:'./matieres.html',

  styleUrl:'./matieres.css'

})


export class Matieres implements OnInit {



  @ViewChild('messageBox') messageBox!: ElementRef;



  matieres:any[] = [];

  message:string = '';

  recherche:string = '';

  modification:boolean = false;

  idModification:number|null = null;



  matiere:any = {

    nom:''

  };





  page:number = 1;

  taillePage:number = 10;

  totalPages:number = 1;









  constructor(


    private matiereService:MatiereService,

    private cd:ChangeDetectorRef


  ){}





  ngOnInit(){

    this.chargerMatieres();

  }









  chargerMatieres(){


    this.matiereService

    .getMatieres()

    .subscribe({


      next:(data:any)=>{


        console.log(
          "Matières reçues :",
          data
        );


        this.matieres = [...data];


        this.calculerPages();


        this.cd.detectChanges();


      },


      error:(error:any)=>{


        console.log(error);


        this.afficherMessage(
          "Erreur chargement matières"
        );


      }


    });


  }









  get matieresFiltrees(){


    const texte =

    this.recherche

    .toLowerCase()

    .trim();



    let resultat = this.matieres;



    if(texte){


      resultat = this.matieres.filter(

        (matiere:any)=>

        matiere.nom

        .toLowerCase()

        .includes(texte)

      );


    }



    this.totalPages = Math.ceil(

      resultat.length /

      this.taillePage

    );



    if(this.totalPages===0){

      this.totalPages=1;

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









  rechercher(){

    this.page=1;

  }









  calculerPages(){


    this.totalPages=Math.ceil(

      this.matieres.length /

      this.taillePage

    );



    if(this.totalPages===0){

      this.totalPages=1;

    }


  }









  pageSuivante(){


    if(this.page<this.totalPages){

      this.page++;

    }


  }









  pagePrecedente(){


    if(this.page>1){

      this.page--;

    }


  }









  ajouterMatiere(){


    if(!this.matiere.nom || this.matiere.nom.trim()===''){


      this.afficherMessage(

        "Le nom de la matière est obligatoire"

      );


      return;

    }






    const existe=this.matieres.some(

      (m:any)=>

      m.nom.toLowerCase()

      ===

      this.matiere.nom.toLowerCase()

    );





    if(existe){


      this.afficherMessage(

        "Cette matière existe déjà"

      );


      return;


    }







    this.matiereService

    .ajouterMatiere(this.matiere)

    .subscribe({



      next:()=>{


        this.afficherMessage(

          "Matière ajoutée avec succès"

        );


        this.resetForm();


        this.chargerMatieres();



      },



      error:(error:any)=>{


        console.log(error);


        this.afficherMessage(

          "Erreur ajout matière"

        );


      }



    });



  }









  modifier(matiere:any){



    this.matiere={


      nom:matiere.nom


    };



    this.idModification=matiere.id;


    this.modification=true;



    setTimeout(()=>{


      window.scrollTo({


        top:0,

        behavior:'smooth'


      });


    },200);



  }









  enregistrerModification(){


    if(this.idModification){


      this.matiereService

      .modifierMatiere(

        this.idModification,

        this.matiere

      )

      .subscribe({



        next:()=>{


          this.afficherMessage(

            "Matière modifiée avec succès"

          );


          this.resetForm();


          this.chargerMatieres();



        },



        error:(error:any)=>{


          console.log(error);


          this.afficherMessage(

            "Erreur modification matière"

          );


        }



      });



    }


  }









  supprimer(id:number){


    if(confirm(

      "Voulez-vous supprimer cette matière ?"

    )){


      this.matiereService

      .supprimerMatiere(id)

      .subscribe({



        next:()=>{


          this.page=1;


          this.chargerMatieres();



          this.afficherMessage(

            "Matière supprimée avec succès"

          );



        },



        error:(error:any)=>{


          console.log(error);


          this.afficherMessage(

            "Erreur suppression"

          );


        }



      });



    }


  }









  afficherMessage(msg:string){


    this.message=msg;


    this.scrollMessage();



    setTimeout(()=>{


      this.message='';


    },3000);


  }









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









  resetForm(){


    this.matiere={


      nom:''


    };


    this.modification=false;


    this.idModification=null;


  }



}
