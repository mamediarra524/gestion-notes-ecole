import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ClasseMatiereService {



  private apiUrl =
  'http://127.0.0.1:8000/api/classe-matieres';





  constructor(
    private http: HttpClient
  ) {}







  private headers(){


    return {

      headers: new HttpHeaders({

        'Authorization':

        'Bearer ' + localStorage.getItem('token'),


        'Accept':

        'application/json'


      })

    };


  }









  // Liste des affectations classe-matière

  getClasseMatieres(){


    return this.http.get(

      this.apiUrl,

      this.headers()

    );


  }









  // Ajouter une affectation

  ajouterClasseMatiere(data:any){


    return this.http.post(

      this.apiUrl,

      data,

      this.headers()

    );


  }









  // Modifier une affectation

  modifierClasseMatiere(

    id:number,

    data:any

  ){


    return this.http.put(

      `${this.apiUrl}/${id}`,

      data,

      this.headers()

    );


  }









  // Supprimer une affectation

  supprimerClasseMatiere(id:number){


    return this.http.delete(

      `${this.apiUrl}/${id}`,

      this.headers()

    );


  }



}
