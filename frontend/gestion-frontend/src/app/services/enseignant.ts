import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EnseignantService {


  private apiUrl =
  'http://127.0.0.1:8000/api/enseignants';



  constructor(
    private http:HttpClient
  ){}





  private headers(){


    return {

      headers:new HttpHeaders({

        'Authorization':
        'Bearer ' + localStorage.getItem('token'),


        'Accept':
        'application/json'


      })

    };


  }







  getEnseignants(){


    return this.http.get(

      this.apiUrl,

      this.headers()

    );


  }







  ajouterEnseignant(data:any){


    return this.http.post(

      this.apiUrl,

      data,

      this.headers()

    );


  }







  modifierEnseignant(
    id:number,
    data:any
  ){


    return this.http.put(

      `${this.apiUrl}/${id}`,

      data,

      this.headers()

    );


  }







  supprimerEnseignant(id:number){


    return this.http.delete(

      `${this.apiUrl}/${id}`,

      this.headers()

    );


  }


}
