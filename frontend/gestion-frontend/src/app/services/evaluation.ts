import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class EvaluationService {



  private apiUrl =

  'http://127.0.0.1:8000/api/evaluations';




  constructor(

    private http:HttpClient

  ){}





  private headers(){


    return {

      headers:new HttpHeaders({

        'Authorization':

        'Bearer ' + localStorage.getItem('token'),


        'Accept':

        'application/json',


        'Content-Type':

        'application/json'


      })

    };


  }








  /*
  |--------------------------------------------------------------------------
  | ADMIN : toutes les évaluations
  |--------------------------------------------------------------------------
  */


  getEvaluations(){


    return this.http.get(

      this.apiUrl,

      this.headers()

    );


  }









  /*
  |--------------------------------------------------------------------------
  | PROF : évaluations par matière
  |--------------------------------------------------------------------------
  */


  getEvaluationsParMatiere(

    matiereId:number

  ){


    return this.http.get(

      `${this.apiUrl}/matiere/${matiereId}`,

      this.headers()

    );


  }









  /*
  |--------------------------------------------------------------------------
  | ADMIN : ajouter
  |--------------------------------------------------------------------------
  */


  ajouterEvaluation(

    data:any

  ){


    return this.http.post(

      this.apiUrl,

      data,

      this.headers()

    );


  }









  /*
  |--------------------------------------------------------------------------
  | ADMIN : modifier
  |--------------------------------------------------------------------------
  */


  modifierEvaluation(

    id:number,

    data:any

  ){


    return this.http.put(

      `${this.apiUrl}/${id}`,

      data,

      this.headers()

    );


  }









  /*
  |--------------------------------------------------------------------------
  | ADMIN : supprimer
  |--------------------------------------------------------------------------
  */


  supprimerEvaluation(

    id:number

  ){


    return this.http.delete(

      `${this.apiUrl}/${id}`,

      this.headers()

    );


  }



}
