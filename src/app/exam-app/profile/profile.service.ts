import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor( private http: HttpClient ) { }

  getResult( emailId: string ) {
    return this.http.get('http://localhost:8080/getResult/?emailId=' + emailId ).pipe();
  }  

}
