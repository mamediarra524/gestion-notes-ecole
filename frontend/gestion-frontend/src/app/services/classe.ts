import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn:'root'
})
export class ClasseService {



  private http = inject(HttpClient);



  // Pour enseignants + admin
  private apiUrl =

  'http://127.0.0.1:8000/api/liste-classes';





  private options(){


    const token = localStorage.getItem('token');



    return {


      headers:new HttpHeaders({


        Authorization:

        `Bearer ${token}`,


        Accept:

        'application/json'


      })


    };


  }









  // Charger les classes

  getClasses(){


    return this.http.get<any[]>(


      this.apiUrl,


      this.options()


    );


  }











  // ==========================
  // ADMIN UNIQUEMENT
  // ==========================



  private adminUrl =

  'http://127.0.0.1:8000/api/classes';






  ajouterClasse(data:any){


    return this.http.post(


      this.adminUrl,


      data,


      this.options()


    );


  }







  modifierClasse(
    id:number,
    data:any
  ){


    return this.http.put(


      `${this.adminUrl}/${id}`,


      data,


      this.options()


    );


  }







  supprimerClasse(id:number){


    return this.http.delete(


      `${this.adminUrl}/${id}`,


      this.options()


    );


  }



}