import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BulletinService {


  private api =
  'http://127.0.0.1:8000/api';



  constructor(
    private http:HttpClient
  ){}




  private headers(){

    return {

      headers:new HttpHeaders({

        Authorization:
        'Bearer '+localStorage.getItem('token'),

        Accept:'application/json'

      })

    };

  }







  getBulletin(id:number){

    return this.http.get(

      `${this.api}/eleves/${id}/bulletin`,

      this.headers()

    );

  }





  getBulletinPdf(id:number){

    return this.http.get(

      `${this.api}/eleves/${id}/bulletin/pdf`,

      {

        ...this.headers(),

        responseType:'blob'

      }

    );

  }


}
