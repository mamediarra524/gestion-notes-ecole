import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EleveService {


  private http = inject(HttpClient);


  private apiUrl = 'http://127.0.0.1:8000/api/eleves';



  private getOptions(){

    const token = localStorage.getItem('token');


    return {

      headers: new HttpHeaders({

        Authorization: `Bearer ${token}`,

        Accept: 'application/json'

      })

    };

  }




  getEleves(){

    return this.http.get(

      this.apiUrl,

      this.getOptions()

    );

  }





  ajouterEleve(data:any){

    return this.http.post(

      this.apiUrl,

      data,

      this.getOptions()

    );

  }





  modifierEleve(id:number, data:any){

    return this.http.put(

      `${this.apiUrl}/${id}`,

      data,

      this.getOptions()

    );

  }





  supprimerEleve(id:number){

    return this.http.delete(

      `${this.apiUrl}/${id}`,

      this.getOptions()

    );

  }


}