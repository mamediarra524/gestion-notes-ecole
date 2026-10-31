import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


import { NoteService } from '../../services/note';
import { ClasseService } from '../../services/classe';
import { EleveService } from '../../services/eleve';
import { EvaluationService } from '../../services/evaluation';
import { ClasseMatiereService } from '../../services/classe-matiere';



@Component({

selector:'app-notes',

standalone:true,

imports:[

CommonModule,

FormsModule,

RouterLink

],

templateUrl:'./notes.html',

styleUrl:'./notes.css'

})


export class Notes implements OnInit {



notes:any[]=[];

notesFiltrees:any[]=[];

notesPage:any[]=[];



classes:any[]=[];

matieres:any[]=[];

elevesClasse:any[]=[];

evaluationsMatiere:any[]=[];





// =======================
// SAISIE
// =======================


classeSaisie:any='';

matiereSaisie:any='';

evaluationSaisie:any='';


notesSaisie:any={};







// =======================
// FILTRES
// =======================


classeFiltre:any='';

matiereFiltre:any='';

recherche:string='';





message:string='';







// =======================
// PAGINATION
// =======================


pageActuelle:number=1;

taillePage:number=10;

totalPages:number=1;








// =======================
// MODIFICATION
// =======================


noteModification:any=null;








constructor(


private noteService:NoteService,

private classeService:ClasseService,

private eleveService:EleveService,

private evaluationService:EvaluationService,

private classeMatiereService:ClasseMatiereService,

private cd:ChangeDetectorRef


){}









ngOnInit(){


this.chargerNotes();


this.chargerClasses();


this.chargerMesMatieres();



}









// =======================
// CHARGER NOTES
// =======================


chargerNotes(){


this.noteService

.getNotes()

.subscribe({


next:(data:any)=>{


console.log(

"NOTES RECUES",

data

);



this.notes=[...data];


this.notesFiltrees=[...data];


this.pageActuelle=1;


this.mettreAJourPagination();



this.cd.detectChanges();



},


error:(err)=>{


console.log(err);


this.message="Erreur chargement notes";


}


});



}









// =======================
// MATIERES DU PROF
// =======================


chargerMesMatieres(){


this.classeMatiereService

.getMesAffectations()

.subscribe({


next:(data:any)=>{


console.log(

"AFFECTATIONS",

data

);




this.matieres=[



...new Map(


data.map((a:any)=>[

a.matiere.id,

a.matiere

])

).values()



];



this.cd.detectChanges();



},


error:(err)=>{


console.log(err);


this.message="Erreur chargement matières";


}


});



}









// =======================
// CLASSES
// =======================


chargerClasses(){


this.classeService

.getClasses()

.subscribe({


next:(data:any)=>{


this.classes=[...data];


this.cd.detectChanges();


},


error:(err)=>{


console.log(err);


}


});


}









// =======================
// ELEVES PAR CLASSE
// =======================


chargerElevesClasse(){


this.elevesClasse=[];


this.notesSaisie={};





if(!this.classeSaisie)

return;





this.eleveService

.getParClasse(

Number(this.classeSaisie)

)

.subscribe({


next:(data:any)=>{


this.elevesClasse=[...data];



this.elevesClasse.forEach(e=>{


this.notesSaisie[e.id]='';



});



this.cd.detectChanges();


},


error:(err)=>{


console.log(err);


this.message="Erreur chargement élèves";


}


});


}









// =======================
// EVALUATIONS PAR MATIERE
// =======================


chargerEvaluationsMatiere(){


this.evaluationsMatiere=[];


this.evaluationSaisie='';





if(!this.matiereSaisie)

return;





this.evaluationService

.getEvaluationsParMatiere(

Number(this.matiereSaisie)

)

.subscribe({


next:(data:any)=>{


console.log(

"EVALUATIONS",

data

);



this.evaluationsMatiere=[...data];



this.cd.detectChanges();



},


error:(err)=>{


console.log(err);


this.message="Erreur évaluations";


}


});

}
// =======================
// ENREGISTRER NOTES
// =======================


enregistrerNotes(){



if(!this.evaluationSaisie){


this.message="⚠️ Choisir une évaluation";


return;


}





Object.keys(this.notesSaisie)

.forEach(id=>{


const valeur=this.notesSaisie[id];



if(

valeur!=='' &&

valeur!==null &&

valeur!==undefined

){



this.noteService

.ajouterNote({


eleve_id:Number(id),


evaluation_id:Number(this.evaluationSaisie),


note:Number(valeur)


})

.subscribe({


next:()=>{


this.message="✅ Notes enregistrées avec succès";


this.chargerNotes();


this.resetSaisie();



setTimeout(()=>{


this.message='';


},3000);



},


error:(err)=>{


console.log(err);


this.message="❌ Erreur enregistrement";


}


});



}



});



}









// =======================
// RESET SAISIE
// =======================


resetSaisie(){


this.classeSaisie='';


this.matiereSaisie='';


this.evaluationSaisie='';


this.elevesClasse=[];


this.notesSaisie={};


}









/// =======================
// FILTRES
// =======================


filtrer(){


console.log(
"FILTRES :",
this.classeFiltre,
this.matiereFiltre,
this.recherche
);





this.notesFiltrees = this.notes.filter((n:any)=>{





// =======================
// CLASSE
// =======================


const classeId =

n.eleve?.classe?.id ??

n.eleve?.classe_id;





const classeOK =


!this.classeFiltre ||


Number(classeId) === Number(this.classeFiltre);









// =======================
// MATIERE
// =======================


const matiereId =


n.evaluation?.matiere?.id ??

n.evaluation?.matiere_id;





const matiereOK =


!this.matiereFiltre ||


Number(matiereId) === Number(this.matiereFiltre);









// =======================
// RECHERCHE ELEVE
// =======================


const nomEleve =


(

(n.eleve?.prenom ?? '')

+

' '

+

(n.eleve?.nom ?? '')

)

.toLowerCase();





const rechercheOK =


!this.recherche ||


nomEleve.includes(

this.recherche.toLowerCase()

);









return (

classeOK &&

matiereOK &&

rechercheOK

);



});







console.log(

"NOTES APRES FILTRE",

this.notesFiltrees

);






this.pageActuelle=1;


this.mettreAJourPagination();



}






// =======================
// PAGINATION
// =======================


mettreAJourPagination(){



this.totalPages=Math.ceil(

this.notesFiltrees.length /

this.taillePage

);





if(this.totalPages < 1){


this.totalPages=1;


}






if(this.pageActuelle > this.totalPages){


this.pageActuelle=this.totalPages;


}






const debut =


(this.pageActuelle-1)

*

this.taillePage;






const fin =


debut +

this.taillePage;






this.notesPage=this.notesFiltrees.slice(

debut,

fin

);






this.cd.detectChanges();



}









pageSuivante(){



if(this.pageActuelle < this.totalPages){



this.pageActuelle++;


this.mettreAJourPagination();



}



}









pagePrecedente(){



if(this.pageActuelle > 1){



this.pageActuelle--;


this.mettreAJourPagination();



}



}









// =======================
// MODIFIER
// =======================


modifierNote(n:any){



this.noteModification={...n};



}








enregistrerModification(){



this.noteService

.modifierNote(

this.noteModification.id,

{

note:Number(this.noteModification.note)

}

)

.subscribe({


next:()=>{


this.message="✅ Note modifiée";


this.noteModification=null;


this.chargerNotes();



},


error:(err)=>{


console.log(err);


this.message="Erreur modification";


}



});



}









// =======================
// SUPPRIMER
// =======================


supprimerNote(id:number){



if(confirm(

"Supprimer cette note ?"

)){



this.noteService

.supprimerNote(id)

.subscribe({



next:()=>{


this.message="✅ Note supprimée";


this.chargerNotes();



},


error:(err)=>{


console.log(err);


this.message="Erreur suppression";


}



});



}



}



}