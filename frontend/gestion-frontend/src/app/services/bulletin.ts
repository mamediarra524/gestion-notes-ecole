import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BulletinService {


  private api =
  'http://127.0.0.1:8000/api';





  constructor(

    private http: HttpClient

  ){}





  /**
   * Headers pour API JSON
   */
  private headersJson(){


    return {


      headers: new HttpHeaders({


        Authorization:

        'Bearer ' + localStorage.getItem('token'),


        Accept:

        'application/json'


      })


    };


  }









  /**
   * Récupérer le bulletin JSON
   */
  getBulletin(id:number){


    return this.http.get(


      `${this.api}/eleves/${id}/bulletin`,


      this.headersJson()


    );


  }









  /**
   * Télécharger le bulletin PDF
   */
  getBulletinPdf(id:number){



    return this.http.get(


      `${this.api}/eleves/${id}/bulletin/pdf`,


      {


        headers:new HttpHeaders({



          Authorization:

          'Bearer ' + localStorage.getItem('token'),



          Accept:

          'application/pdf'



        }),



        responseType:'blob'


      }



    );


  }



}
