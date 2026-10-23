import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { NoteService } from '../../services/note';
import { EleveService } from '../../services/eleve';
import { MatiereService } from '../../services/matiere';



@Component({

  selector:'app-notes',

  standalone:true,

  imports:[

    CommonModule,
    FormsModule,
    RouterModule

  ],

  templateUrl:'./notes.html',

  styleUrl:'./notes.css'

})


export class Notes implements OnInit {



  notes:any[]=[];

  notesFiltrees:any[]=[];


  eleves:any[]=[];

  matieres:any[]=[];



  message:string='';



  modification:boolean=false;


  noteId:number|null=null;





  // Recherche et filtre

  recherche:string='';


  matiereFiltre:any=null;





  // Pagination

  page:number=1;


  taillePage:number=20;


  totalPages:number=1;









  note:any={


    eleve_id:null,

    matiere_id:null,

    enseignant_id:null,

    note:null


  };









  constructor(


    private noteService:NoteService,


    private eleveService:EleveService,


    private matiereService:MatiereService,


    private cd:ChangeDetectorRef


  ){}





  ngOnInit():void{


    this.chargerNotes();

    this.chargerEleves();

    this.chargerMatieres();


  }









  // =========================
  // CHARGER NOTES
  // =========================


  chargerNotes(){


    this.noteService.getNotes()


    .subscribe({


      next:(data:any)=>{


        console.log(
          "Notes reçues :",
          data
        );



        this.notes=data;


        this.appliquerFiltre();


        this.cd.detectChanges();


      },


      error:(err:any)=>{


        console.log(err);


      }


    });


  }









  // =========================
  // FILTRE + RECHERCHE
  // =========================


  appliquerFiltre(){


    let resultat=this.notes;



    if(this.recherche){


      const texte=this.recherche.toLowerCase();



      resultat=resultat.filter((n:any)=>{


        const nom =
        n.eleve?.nom?.toLowerCase() || '';



        const prenom =
        n.eleve?.prenom?.toLowerCase() || '';



        return (

          nom.includes(texte)

          ||

          prenom.includes(texte)

        );


      });


    }







    if(this.matiereFiltre){


      resultat=resultat.filter((n:any)=>


        n.matiere_id ==
        this.matiereFiltre


      );


    }





    this.notesFiltrees=resultat;



    this.totalPages=Math.ceil(

      this.notesFiltrees.length /
      this.taillePage

    );



    this.page=1;



  }









  // =========================
  // PAGINATION
  // =========================


  get notesPage(){


    const debut =

    (this.page-1)
    *
    this.taillePage;



    return this.notesFiltrees.slice(

      debut,

      debut + this.taillePage

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









  // =========================
  // CHARGER ELEVES
  // =========================


  chargerEleves(){


    this.eleveService.getEleves()


    .subscribe({


      next:(data:any)=>{


        this.eleves=data;


        this.cd.detectChanges();


      },


      error:(err:any)=>{


        console.log(err);


      }


    });


  }









  // =========================
  // CHARGER MATIERES
  // =========================


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









  // =========================
  // AJOUT / MODIFICATION
  // =========================


  enregistrerNote(){


    if(this.modification && this.noteId){



      this.noteService.modifierNote(

        this.noteId,

        this.note

      )

      .subscribe({


        next:()=>{


          this.message=
          "Note modifiée avec succès";


          this.chargerNotes();


          this.resetForm();


        },


        error:(err:any)=>{


          this.message=
          err.error.message;


        }


      });



    }

    else {



      this.noteService.ajouterNote(

        this.note

      )


      .subscribe({


        next:()=>{


          this.message=
          "Note ajoutée avec succès";


          this.chargerNotes();


          this.resetForm();


        },


        error:(err:any)=>{


          this.message=
          err.error.message;


        }


      });


    }


  }









  modifierNote(n:any){



    this.modification=true;


    this.noteId=n.id;



    this.note={


      eleve_id:n.eleve_id,


      matiere_id:n.matiere_id,


      enseignant_id:n.enseignant_id,


      note:n.note


    };


  }









  supprimerNote(id:number){


    if(confirm(
      "Supprimer cette note ?"
    )){


      this.noteService.supprimerNote(id)


      .subscribe({


        next:()=>{


          this.message=
          "Note supprimée avec succès";


          this.chargerNotes();


        },


        error:(err:any)=>{


          console.log(err);


        }


      });


    }


  }









  resetForm(){


    this.modification=false;


    this.noteId=null;



    this.note={


      eleve_id:null,


      matiere_id:null,


      enseignant_id:null,


      note:null


    };


  }



}
