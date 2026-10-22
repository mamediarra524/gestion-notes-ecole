import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  private apiUrl = 'http://127.0.0.1:8000/api/dashboard';



  constructor(
    private http: HttpClient
  ) {}





  getDashboard()
  {


    const token = localStorage.getItem('token');



    const headers = new HttpHeaders({

      Authorization: `Bearer ${token}`,

      Accept: 'application/json'

    });



    return this.http.get(
      this.apiUrl,
      {
        headers
      }
    );


  }


}