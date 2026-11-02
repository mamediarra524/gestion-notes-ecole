import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClasseService {


  private http = inject(HttpClient);


  private apiUrl = 'http://127.0.0.1:8000/api/classes';



  /**
   * Headers avec token Sanctum
   */
  private options(){


    const token = localStorage.getItem('token');


    return {

      headers: new HttpHeaders({

        Authorization: `Bearer ${token}`,

        Accept: 'application/json',

        'Content-Type': 'application/json'

      })

    };


  }





  /**
   * Liste des classes
   * ADMIN + ENSEIGNANT
   */
  getClasses(){


    return this.http.get<any[]>(

      this.apiUrl,

      this.options()

    );


  }





  /**
   * Voir une classe
   */
  getClasse(id:number){


    return this.http.get<any>(

      `${this.apiUrl}/${id}`,

      this.options()

    );


  }





  /**
   * Ajouter une classe
   * ADMIN
   */
  ajouterClasse(data:any){


    return this.http.post<any>(

      this.apiUrl,

      data,

      this.options()

    );


  }





  /**
   * Modifier une classe
   * ADMIN
   */
  modifierClasse(
    id:number,
    data:any
  ){


    return this.http.put<any>(

      `${this.apiUrl}/${id}`,

      {

        nom:data.nom,

        niveau:data.niveau

      },

      this.options()

    );


  }





  /**
   * Supprimer une classe
   * ADMIN
   */
  supprimerClasse(id:number){


    return this.http.delete<any>(

      `${this.apiUrl}/${id}`,

      this.options()

    );


  }





  /**
   * Liste élèves d'une classe
   */
  getElevesClasse(id:number){


    return this.http.get<any>(

      `${this.apiUrl}/${id}/eleves`,

      this.options()

    );


  }


}