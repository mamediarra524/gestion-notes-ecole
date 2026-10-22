import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ClasseService {


  private http = inject(HttpClient);



  private apiUrl = 
  'http://127.0.0.1:8000/api/classes';




  private options(){


    const token = localStorage.getItem('token');


    return {

      headers: new HttpHeaders({

        Authorization: `Bearer ${token}`,

        Accept: 'application/json'

      })

    };


  }






  getClasses(){


    return this.http.get(

      this.apiUrl,

      this.options()

    );


  }







  ajouterClasse(data:any){


    return this.http.post(

      this.apiUrl,

      data,

      this.options()

    );


  }







  modifierClasse(id:number, data:any){


    return this.http.put(

      `${this.apiUrl}/${id}`,

      data,

      this.options()

    );


  }







  supprimerClasse(id:number){


    return this.http.delete(

      `${this.apiUrl}/${id}`,

      this.options()

    );


  }



}