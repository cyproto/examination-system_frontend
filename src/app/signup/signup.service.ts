import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  userCollection: any = null;
  constructor(private firestore: AngularFirestore) { 
    this.userCollection = this.firestore.collection('users');
  }

  addUser(user){
    this.userCollection.doc(user['email']).set(user);
  }
}
