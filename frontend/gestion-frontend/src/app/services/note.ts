import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn:'root'
})
export class NoteService {



  private http = inject(HttpClient);



  private apiUrl =

  'http://127.0.0.1:8000/api/notes';







  private options()
  {


    const token = localStorage.getItem('token');



    console.log(

      "TOKEN ENVOYE NOTES :",

      token

    );





    return {


      headers:new HttpHeaders({



        Authorization:

        `Bearer ${token}`,



        Accept:

        'application/json',



        'Content-Type':

        'application/json'



      })



    };



  }









  // ============================
  // LISTE DES NOTES
  // ============================


  getNotes()
  {


    return this.http.get<any[]>(


      this.apiUrl,


      this.options()


    );


  }









  // ============================
  // AJOUTER UNE NOTE
  // ============================


  ajouterNote(data:any)
  {


    return this.http.post(


      this.apiUrl,


      data,


      this.options()


    );


  }









  // ============================
  // AFFICHER UNE NOTE
  // ============================


  getNote(id:number)
  {


    return this.http.get(


      `${this.apiUrl}/${id}`,


      this.options()


    );


  }









  // ============================
  // MODIFIER UNE NOTE
  // ============================


  modifierNote(

    id:number,

    data:any

  )
  {


    return this.http.put(


      `${this.apiUrl}/${id}`,


      data,


      this.options()


    );


  }









  // ============================
  // SUPPRIMER UNE NOTE
  // ============================


  supprimerNote(id:number)
  {


    return this.http.delete(


      `${this.apiUrl}/${id}`,


      this.options()


    );


  }



}
