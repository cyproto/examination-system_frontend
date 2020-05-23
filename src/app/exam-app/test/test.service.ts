import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  userCollection: any;
  constructor(private firestore: AngularFirestore, private http: HttpClient) { 
    this.userCollection = this.firestore.collection('users');
  }

  updateUser(userEmail, user){
    console.log(userEmail,user);
    this.userCollection.doc(userEmail).update(user);
  }

  sendResult( requestBody: any ) {
    console.log( requestBody);
    return this.http.post('http://localhost:8080/sendResult/', requestBody ).pipe();
  } 
}
