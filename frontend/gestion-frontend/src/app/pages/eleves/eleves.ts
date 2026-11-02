import { 
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef
} from '@angular/core';

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



  @ViewChild('messageBox') messageBox!: ElementRef;



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



    if(user.role !== 'ADMIN'){


      this.message =
      "Accès réservé à l'administration";


      this.scrollMessage();


      return;


    }





    this.chargerEleves();

    this.chargerClasses();



  }









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


        this.message =
        "Erreur chargement élèves";


        this.scrollMessage();



      }



    });



  }









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









  ajouterEleve(){



    this.eleveService

    .ajouterEleve(this.eleve)

    .subscribe({



      next:(res:any)=>{


        this.message =

        res.message ||

        "Élève ajouté avec succès";



        this.resetForm();


        this.chargerEleves();



        this.scrollMessage();



      },



      error:(err)=>{


        console.log(err);


        this.message =

        "Erreur ajout élève";


        this.scrollMessage();



      }



    });



  }









  modifier(eleve:any){



    this.eleve={


      nom:eleve.nom,


      prenom:eleve.prenom,



      date_naissance:

      eleve.date_naissance

      ?

      eleve.date_naissance.substring(0,10)

      :

      '',



      classe_id:

      eleve.classe?.id || eleve.classe_id



    };





    this.idModification=

    eleve.id;



    this.modification=true;



    window.scrollTo({

      top:0,

      behavior:'smooth'

    });



  }









  enregistrerModification(){



    if(this.idModification===null){

      return;

    }





    this.eleveService

    .modifierEleve(

      this.idModification,

      this.eleve

    )

    .subscribe({



      next:(res:any)=>{


        this.message =

        res.message ||

        "Élève modifié avec succès";



        this.resetForm();


        this.chargerEleves();



        this.scrollMessage();



      },



      error:(err)=>{


        console.log(
          "Erreur modification :",
          err.error
        );



        this.message =

        "Erreur modification";


        this.scrollMessage();



      }



    });



  }









  supprimer(id:number){



    if(!confirm(

      "Supprimer cet élève ?"

    )){


      return;


    }





    this.eleveService

    .supprimerEleve(id)

    .subscribe({



      next:(res:any)=>{


        this.message =

        res.message ||

        "Élève supprimé avec succès";



        this.chargerEleves();



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