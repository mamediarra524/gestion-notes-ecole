import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


import { NoteService } from '../../services/note';
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





classeSaisie:any='';

matiereSaisie:any='';

evaluationSaisie:any='';



notesSaisie:any={};





classeFiltre:any='';

matiereFiltre:any='';

recherche:string='';





message:string='';





pageActuelle:number=1;

taillePage:number=10;

totalPages:number=1;





noteModification:any=null;








constructor(


private noteService:NoteService,

private eleveService:EleveService,

private evaluationService:EvaluationService,

private classeMatiereService:ClasseMatiereService,

private cd:ChangeDetectorRef


){}








ngOnInit(){


this.chargerNotes();

this.chargerClasses();


}









// =======================
// CHARGER NOTES
// =======================


chargerNotes(){


this.noteService

.getNotes()

.subscribe({


next:(data:any)=>{


console.log("NOTES RECUES",data);



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
// CLASSES DU PROFESSEUR
// =======================


chargerClasses(){


this.classeMatiereService

.getMesAffectations()

.subscribe({


next:(data:any)=>{


console.log("AFFECTATIONS",data);




this.classes=[

...new Map(

data.map((a:any)=>[

a.classe.id,

a.classe

])

).values()

];



this.cd.detectChanges();



},


error:(err)=>{


console.log(err);


this.message="Erreur chargement classes";


}


});


}
// =======================
// ELEVES + MATIERES SELON CLASSE
// =======================

chargerElevesClasse(){


this.elevesClasse=[];

this.notesSaisie={};


this.matieres=[];

this.matiereSaisie='';


this.evaluationsMatiere=[];

this.evaluationSaisie='';




if(!this.classeSaisie)

return;






// =======================
// ELEVES DE LA CLASSE
// =======================


this.eleveService

.getParClasse(Number(this.classeSaisie))

.subscribe({


next:(data:any)=>{


console.log("ELEVES",data);



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









// =======================
// MATIERES DE CETTE CLASSE
// =======================


this.classeMatiereService

.getMesAffectations()

.subscribe({


next:(data:any)=>{



const affectations = data.filter((a:any)=>



Number(a.classe_id) === Number(this.classeSaisie)



);






this.matieres=[


...new Map(


affectations.map((a:any)=>[


a.matiere.id,


a.matiere


])


).values()



];





console.log(

"MATIERES CLASSE",

this.matieres

);



this.cd.detectChanges();



},


error:(err)=>{


console.log(err);


this.message="Erreur chargement matières";


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


console.log(

"CLASSE",

this.classeSaisie

);


console.log(

"MATIERE",

this.matiereSaisie

);


console.log(

"EVALUATION",

this.evaluationSaisie

);


console.log(

"NOTES",

this.notesSaisie

);





if(!this.evaluationSaisie){



this.message=

"⚠️ Choisir une évaluation";


this.scrollMessage();


return;


}






const listeNotes = Object.keys(this.notesSaisie)

.filter(id =>



this.notesSaisie[id] !== ''

&&

this.notesSaisie[id] !== null



);






if(listeNotes.length===0){


this.message=

"⚠️ Aucune note saisie";


this.scrollMessage();


return;


}






let compteur=0;






listeNotes.forEach(id=>{





const note={


eleve_id:Number(id),


evaluation_id:Number(this.evaluationSaisie),


note:Number(this.notesSaisie[id])


};






console.log(

"NOTE ENVOYEE",

note

);






this.noteService

.ajouterNote(note)

.subscribe({



next:(response)=>{



console.log(

"REPONSE",

response

);



compteur++;





if(compteur===listeNotes.length){



this.message=

"✅ Notes enregistrées avec succès";





this.chargerNotes();





this.resetSaisie();





this.scrollMessage();




}



},





error:(err)=>{


console.log(

"ERREUR",

err

);



this.message=

"❌ Erreur enregistrement";



this.scrollMessage();



}



});



});



}
// =======================
// RESET FORMULAIRE
// =======================

resetSaisie(){


this.classeSaisie='';


this.matiereSaisie='';


this.evaluationSaisie='';





this.elevesClasse=[];


this.matieres=[];


this.evaluationsMatiere=[];



this.notesSaisie={};



}









// =======================
// SCROLL MESSAGE
// =======================

scrollMessage(){


setTimeout(()=>{


const element=document.querySelector('.message');



if(element){


element.scrollIntoView({


behavior:'smooth',


block:'center'


});


}



},300);



}









// =======================
// FILTRES
// =======================

filtrer(){


this.notesFiltrees=this.notes.filter((n:any)=>{





const classeId =


n.eleve?.classe?.id ??

n.eleve?.classe_id;





const classeOK =


!this.classeFiltre ||


Number(classeId)===Number(this.classeFiltre);







const matiereId =


n.evaluation?.matiere?.id ??

n.evaluation?.matiere_id;






const matiereOK =


!this.matiereFiltre ||


Number(matiereId)===Number(this.matiereFiltre);








const nom =


(

n.eleve?.prenom ?? ''

)

+

' '

+

(

n.eleve?.nom ?? ''

);






const rechercheOK =


!this.recherche ||


nom

.toLowerCase()

.includes(

this.recherche.toLowerCase()

);






return (

classeOK &&

matiereOK &&

rechercheOK

);



});






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





if(this.totalPages<1){


this.totalPages=1;


}







if(this.pageActuelle>this.totalPages){


this.pageActuelle=this.totalPages;


}






const debut =


(this.pageActuelle-1)

*

this.taillePage;







this.notesPage=


this.notesFiltrees.slice(


debut,


debut+this.taillePage


);





this.cd.detectChanges();



}









pageSuivante(){


if(this.pageActuelle<this.totalPages){


this.pageActuelle++;


this.mettreAJourPagination();


}


}









pagePrecedente(){


if(this.pageActuelle>1){


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


this.message=

"✅ Note modifiée";


this.noteModification=null;


this.chargerNotes();



},


error:(err)=>{


console.log(err);


this.message=

"❌ Erreur modification";


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


this.message=

"✅ Note supprimée";


this.chargerNotes();



},




error:(err)=>{


console.log(err);


this.message=

"❌ Erreur suppression";


}



});



}



}



}