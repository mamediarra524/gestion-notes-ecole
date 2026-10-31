import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


import { BulletinService } from '../../services/bulletin';
import { EleveService } from '../../services/eleve';
import { ClasseService } from '../../services/classe';



@Component({

selector:'app-bulletins',

standalone:true,

imports:[

CommonModule,

FormsModule,

RouterLink

],

templateUrl:'./bulletins.html',

styleUrl:'./bulletins.css'

})


export class Bulletins implements OnInit {



/*
|--------------------------------------------------------------------------
| CLASSES
|--------------------------------------------------------------------------
*/


classes:any[]=[];


classeId:number|null=null;







/*
|--------------------------------------------------------------------------
| ELEVES
|--------------------------------------------------------------------------
*/


elevesClasse:any[]=[];







/*
|--------------------------------------------------------------------------
| BULLETIN
|--------------------------------------------------------------------------
*/


bulletin:any=null;


message:string='';







constructor(

private bulletinService:BulletinService,

private eleveService:EleveService,

private classeService:ClasseService,

private cdr:ChangeDetectorRef


){}







ngOnInit(){


this.chargerClasses();


}









/*
|--------------------------------------------------------------------------
| CHARGER CLASSES
|--------------------------------------------------------------------------
*/


chargerClasses(){


console.log(

"Chargement classes..."

);




this.classeService

.getClasses()

.subscribe({


next:(data:any)=>{


console.log(

"Classes reçues :",

data

);




this.classes = Array.isArray(data)

?

[...data]

:

data.data ?? [];





console.log(

"Classes affichées :",

this.classes

);



this.cdr.detectChanges();



},



error:(err)=>{


console.error(

"Erreur classes",

err

);


this.message=

"Erreur chargement classes";


}



});



}









/*
|--------------------------------------------------------------------------
| CHARGER ELEVES D'UNE CLASSE
|--------------------------------------------------------------------------
*/


chargerElevesClasse(){



this.bulletin=null;




if(this.classeId===null){


this.elevesClasse=[];


return;


}






console.log(

"Classe choisie :",

this.classeId

);






this.eleveService

.getElevesParClasse(

Number(this.classeId)

)

.subscribe({



next:(data:any)=>{


console.log(

"Élèves reçus :",

data

);





this.elevesClasse = Array.isArray(data)

?

[...data]

:

data.data ?? [];





this.message='';



this.cdr.detectChanges();



},




error:(err)=>{


console.error(

"Erreur élèves",

err

);


this.message=

"Erreur chargement élèves";


}



});



}









/*
|--------------------------------------------------------------------------
| VOIR BULLETIN
|--------------------------------------------------------------------------
*/


voirBulletin(id:number){



console.log(

"ID élève :",

id

);





this.bulletinService

.getBulletin(id)

.subscribe({



next:(data:any)=>{



console.log(

"Bulletin reçu :",

data

);





this.bulletin=null;



setTimeout(()=>{



this.bulletin={...data};



this.message='';



this.cdr.detectChanges();



this.scrollVersBulletin();



},100);



},




error:(err)=>{


console.error(

"Erreur bulletin",

err

);


this.message=

"Erreur chargement bulletin";


}



});



}









/*
|--------------------------------------------------------------------------
| SCROLL BULLETIN
|--------------------------------------------------------------------------
*/


scrollVersBulletin(){


setTimeout(()=>{


const element=

document.getElementById(

'bulletin'

);




if(element){


element.scrollIntoView({


behavior:'smooth',


block:'start'


});


}



},200);



}









/*
|--------------------------------------------------------------------------
| PDF
|--------------------------------------------------------------------------
*/


telechargerPDF(id:number){



this.bulletinService

.getBulletinPdf(id)

.subscribe({



next:(data:Blob)=>{



const url=

window.URL.createObjectURL(data);




const lien=

document.createElement('a');



lien.href=url;



lien.download=

'bulletin.pdf';



lien.click();



window.URL.revokeObjectURL(url);



},





error:(err)=>{


console.error(

"Erreur PDF",

err

);


this.message=

"Erreur téléchargement PDF";


}



});



}



}