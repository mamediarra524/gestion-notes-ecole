import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MatiereService {


  private apiUrl =
  'http://127.0.0.1:8000/api/matieres';



  constructor(
    private http: HttpClient
  ) {}





  private headers(){


    return {

      headers: new HttpHeaders({

        'Authorization':
        'Bearer ' + localStorage.getItem('token'),

        'Accept':
        'application/json',

        'Content-Type':
        'application/json'

      })

    };


  }






  getMatieres(){


    return this.http.get(

      this.apiUrl,

      this.headers()

    );


  }






  ajouterMatiere(matiere:any){


    return this.http.post(

      this.apiUrl,

      matiere,

      this.headers()

    );


  }






  modifierMatiere(
    id:number,
    matiere:any
  ){


    return this.http.put(

      `${this.apiUrl}/${id}`,

      matiere,

      this.headers()

    );


  }






  supprimerMatiere(id:number){


    return this.http.delete(

      `${this.apiUrl}/${id}`,

      this.headers()

    );


  }


}