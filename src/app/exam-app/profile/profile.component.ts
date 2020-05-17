import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userEmail: string = '';
  userProfile: any;
  constructor( private angularFirestore: AngularFirestore ) { 
    this.userEmail = sessionStorage.getItem( 'userEmail' );
    firebase.firestore().collection( 'users' ).where( firebase.firestore.FieldPath.documentId(), '==', this.userEmail ).get()
    .then( result => {
      result.forEach( element => {
        this.userProfile = element.data();
        console.log( this.userProfile );
      });
    });
  }

  ngOnInit() {
  }

}
