import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EnseignantService {


  private apiUrl =
  'http://127.0.0.1:8000/api/enseignants';





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









  // =========================
  // LISTE ENSEIGNANTS
  // =========================

  getEnseignants(){


    return this.http.get(

      this.apiUrl,

      this.headers()

    );


  }









  // =========================
  // AJOUT ENSEIGNANT
  // =========================

  ajouterEnseignant(
    enseignant:any
  ){


    return this.http.post(

      this.apiUrl,

      enseignant,

      this.headers()

    );


  }









  // =========================
  // MODIFICATION
  // =========================

  modifierEnseignant(

    id:number,

    enseignant:any

  ){


    return this.http.put(

      `${this.apiUrl}/${id}`,

      enseignant,

      this.headers()

    );


  }









  // =========================
  // SUPPRESSION
  // =========================

  supprimerEnseignant(

    id:number

  ){


    return this.http.delete(

      `${this.apiUrl}/${id}`,

      this.headers()

    );


  }









  // =========================
  // RESET MOT DE PASSE
  // =========================

  resetPassword(

    id:number

  ){


    return this.http.post(

      `${this.apiUrl}/${id}/reset-password`,

      {},

      this.headers()

    );


  }



}