import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn:'root'
})
export class NoteService {


  private apiUrl =
  'http://127.0.0.1:8000/api/notes';



  constructor(
    private http:HttpClient
  ){}





  private options(){


    return {

      headers:new HttpHeaders({

        Authorization:
        'Bearer ' + localStorage.getItem('token'),

        Accept:
        'application/json'

      })

    };


  }






  getNotes(){


    return this.http.get(

      this.apiUrl,

      this.options()

    );


  }






  ajouterNote(data:any){


    return this.http.post(

      this.apiUrl,

      data,

      this.options()

    );


  }







  modifierNote(
    id:number,
    data:any
  ){


    return this.http.put(

      `${this.apiUrl}/${id}`,

      data,

      this.options()

    );


  }








  supprimerNote(id:number){


    return this.http.delete(

      `${this.apiUrl}/${id}`,

      this.options()

    );


  }



}
