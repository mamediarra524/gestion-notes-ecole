import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
providedIn:'root'
})
export class EleveService {



private http = inject(HttpClient);



private apiUrl =
'http://127.0.0.1:8000/api/eleves';





private options(){


const token = localStorage.getItem('token');


return {


headers:new HttpHeaders({


Authorization:

`Bearer ${token}`,


Accept:'application/json'


})


};


}






// =====================
// ADMIN
// =====================


getEleves(){


return this.http.get<any[]>(

this.apiUrl,

this.options()

);


}








// =====================
// ENSEIGNANT
// =====================


getElevesParClasse(id:number){


return this.http.get<any[]>(


`http://127.0.0.1:8000/api/classes/${id}/eleves`,


this.options()


);


}





getParClasse(id:number){


return this.getElevesParClasse(id);


}









ajouterEleve(data:any){


return this.http.post(

this.apiUrl,

data,

this.options()

);


}







modifierEleve(
id:number,
data:any
){


return this.http.put(

`${this.apiUrl}/${id}`,

data,

this.options()

);


}







supprimerEleve(id:number){


return this.http.delete(

`${this.apiUrl}/${id}`,

this.options()

);


}



}