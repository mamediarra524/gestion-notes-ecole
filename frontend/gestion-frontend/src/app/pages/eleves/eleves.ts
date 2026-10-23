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





  // Pagination

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



        this.page=1;



        this.cd.detectChanges();



      },



      error:(error:any)=>{


        console.log(error);



        this.message=

        "Erreur chargement élèves";



      }



    });



  }









  chargerClasses(){



    this.classeService.getClasses()

    .subscribe({



      next:(data:any)=>{


        this.classes = Array.isArray(data)

        ? data

        : [];



        this.cd.detectChanges();



      },



      error:(error:any)=>{


        console.log(error);


      }



    });



  }









  // Recherche + pagination


  get elevesFiltres(){



    let resultat=this.eleves;



    const texte=this.recherche

    .toLowerCase()

    .trim();





    if(texte){



      resultat=this.eleves.filter((e:any)=>



        e.nom.toLowerCase().includes(texte)

        ||

        e.prenom.toLowerCase().includes(texte)



      );



    }






    const debut=(this.page-1)

    *

    this.elementsParPage;





    return resultat.slice(

      debut,

      debut + this.elementsParPage

    );



  }









  get totalPages(){



    let resultat=this.eleves;



    const texte=this.recherche

    .toLowerCase()

    .trim();





    if(texte){



      resultat=this.eleves.filter((e:any)=>


        e.nom.toLowerCase().includes(texte)

        ||

        e.prenom.toLowerCase().includes(texte)



      );



    }





    return Math.ceil(

      resultat.length /

      this.elementsParPage

    );



  }









  pageSuivante(){



    if(this.page < this.totalPages){


      this.page++;


    }



  }









  pagePrecedente(){



    if(this.page>1){


      this.page--;


    }



  }









  ajouterEleve(){



    if(


      !this.eleve.nom ||

      !this.eleve.prenom ||

      !this.eleve.date_naissance ||

      !this.eleve.classe_id



    ){



      this.message=

      "Veuillez remplir tous les champs";



      return;


    }








    this.eleveService

    .ajouterEleve(this.eleve)

    .subscribe({



      next:(response:any)=>{


        console.log(response);



        this.message=

        "Élève ajouté avec succès";



        this.resetForm();



        this.chargerEleves();



      },



      error:(error:any)=>{


        console.log(error);



        this.message=

        "Erreur ajout élève";



      }



    });



  }









  modifier(eleve:any){



    this.eleve={


      nom:eleve.nom,


      prenom:eleve.prenom,


      date_naissance:

      eleve.date_naissance.substring(0,10),


      classe_id:eleve.classe_id



    };





    this.idModification=eleve.id;



    this.modification=true;



  }









  enregistrerModification(){



    if(this.idModification===null){


      this.message=

      "Aucun élève sélectionné";


      return;


    }








    this.eleveService

    .modifierEleve(

      this.idModification,

      this.eleve

    )

    .subscribe({



      next:(response:any)=>{



        console.log(response);



        this.message=

        "Élève modifié avec succès";



        this.resetForm();



        this.chargerEleves();



      },



      error:(error:any)=>{


        console.log(error);



        this.message=

        "Erreur modification élève";



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



        next:()=>{


          this.message=

          "Élève supprimé avec succès";



          this.chargerEleves();



        },



        error:(error:any)=>{


          console.log(error);



          this.message=

          "Erreur suppression";



        }



      });



    }



  }









  retourDashboard(){


    this.router.navigate([

      '/dashboard'

    ]);


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



}