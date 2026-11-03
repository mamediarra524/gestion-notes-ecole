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

import { EnseignantService } from '../../services/enseignant';



@Component({

  selector:'app-enseignants',

  standalone:true,

  imports:[

    CommonModule,
    FormsModule,
    RouterLink

  ],

  templateUrl:'./enseignants.html',

  styleUrl:'./enseignants.css'

})


export class Enseignants implements OnInit {


  @ViewChild('messageBox') messageBox!: ElementRef;


  enseignants:any[] = [];

  message:string = '';

  recherche:string = '';

  modification:boolean = false;

  idModification:number|null = null;



  page:number = 1;

  elementsParPage:number = 10;





  enseignant:any = {

    nom:'',
    prenom:'',
    email:'',
    telephone:'',
    password:'',
    password_confirmation:''

  };







  constructor(

    private enseignantService:EnseignantService,

    private cd:ChangeDetectorRef

  ){}





  ngOnInit(){

    this.chargerEnseignants();

  }









  chargerEnseignants(){


    this.enseignantService

    .getEnseignants()

    .subscribe({


      next:(data:any)=>{


        console.log(
          "Enseignants reçus :",
          data
        );


        this.enseignants = [...data];


        this.page = 1;


        this.cd.detectChanges();


      },


      error:(error:any)=>{


        console.log(error);


        this.afficherMessage(
          "Erreur chargement enseignants"
        );


      }


    });


  }









  get enseignantsFiltres(){


    const texte = this.recherche
    .toLowerCase()
    .trim();



    let resultat = this.enseignants;



    if(texte){


      resultat = this.enseignants.filter((e:any)=>

        e.nom.toLowerCase().includes(texte)

        ||

        e.prenom.toLowerCase().includes(texte)

        ||

        e.email.toLowerCase().includes(texte)

      );


    }



    const debut =

    (this.page - 1)

    *

    this.elementsParPage;



    return resultat.slice(

      debut,

      debut + this.elementsParPage

    );


  }








  get totalPages(){


    return Math.ceil(

      this.enseignants.length /

      this.elementsParPage

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









  ajouterEnseignant(){


    if(


      !this.enseignant.nom ||

      !this.enseignant.prenom ||

      !this.enseignant.email ||

      !this.enseignant.password


    ){


      this.afficherMessage(
        "Veuillez remplir tous les champs obligatoires"
      );


      return;


    }






    if(

      this.enseignant.password !==

      this.enseignant.password_confirmation

    ){


      this.afficherMessage(
        "Les mots de passe ne correspondent pas"
      );


      return;


    }







    this.enseignantService

    .ajouterEnseignant(

      this.enseignant

    )

    .subscribe({



      next:(response:any)=>{


        console.log(response);



        this.afficherMessage(
          "Enseignant ajouté avec succès"
        );



        this.resetForm();



        this.chargerEnseignants();



      },



      error:(error:any)=>{


        console.log(error);



        this.afficherMessage(
          "Erreur ajout enseignant"
        );


      }



    });


  }









  modifier(e:any){


    this.enseignant = {


      nom:e.nom,

      prenom:e.prenom,

      email:e.email,

      telephone:e.telephone,

      password:'',

      password_confirmation:''


    };



    this.idModification = e.id;


    this.modification = true;



    setTimeout(()=>{


      window.scrollTo({


        top:0,

        behavior:'smooth'


      });


    },200);



  }









  enregistrerModification(){


    if(this.idModification){



      this.enseignantService

      .modifierEnseignant(

        this.idModification,

        this.enseignant

      )

      .subscribe({



        next:()=>{


          this.afficherMessage(
            "Enseignant modifié avec succès"
          );



          this.resetForm();


          this.chargerEnseignants();



        },


        error:(error:any)=>{


          console.log(error);



          this.afficherMessage(
            "Erreur modification enseignant"
          );


        }



      });


    }


  }









  resetPassword(e:any){


    if(confirm(

      "Réinitialiser le mot de passe de "

      + e.prenom

      + " "

      + e.nom

      + " ?"

    )){


      this.enseignantService

      .resetPassword(e.id)

      .subscribe({



        next:(response:any)=>{


          alert(

            "Nouveau mot de passe : "

            + response.password

          );



          this.afficherMessage(
            "Mot de passe réinitialisé avec succès"
          );



        },



        error:(error:any)=>{


          console.log(error);


          this.afficherMessage(
            "Erreur réinitialisation mot de passe"
          );


        }



      });



    }


  }









  supprimer(id:number){


    if(confirm(

      "Voulez-vous supprimer cet enseignant ?"

    )){


      this.enseignantService

      .supprimerEnseignant(id)

      .subscribe({



        next:()=>{


          this.chargerEnseignants();



          this.afficherMessage(
            "Enseignant supprimé avec succès"
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









  afficherMessage(message:string){


    this.message = message;


    setTimeout(()=>{


      this.scrollMessage();


    },200);



    setTimeout(()=>{


      this.message='';


    },3000);


  }









  scrollMessage(){


    if(this.messageBox){


      this.messageBox.nativeElement

      .scrollIntoView({


        behavior:'smooth',

        block:'center'


      });


    }


  }









  resetForm(){


    this.enseignant = {


      nom:'',

      prenom:'',

      email:'',

      telephone:'',

      password:'',

      password_confirmation:''


    };



    this.modification = false;


    this.idModification = null;


  }



}