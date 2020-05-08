import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  userCollection: any;
  constructor(private firestore: AngularFirestore) { 
    this.userCollection = this.firestore.collection('users');
  }

  updateUser(userEmail, user){
    console.log(userEmail,user);
    this.userCollection.doc(userEmail).update(user);
  }
}
