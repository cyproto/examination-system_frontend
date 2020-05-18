import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userEmail: string = '';
  userProfile: any;
  questionsData: any [];
  questionsCount: number = 0;
  correctAnswersCount: number = 0;
  attemptedQuestionsCount: number = 0;
  percentage: number = 0;
  passingCutOff: number = 35;
  grade: String;
  constructor( private angularFirestore: AngularFirestore ) { 
    this.userEmail = sessionStorage.getItem( 'userEmail' );
    firebase.firestore().collection( 'users' ).where( firebase.firestore.FieldPath.documentId(), '==', this.userEmail ).get()
    .then( result => {
      result.forEach( element => {
        this.userProfile = element.data();
        this.questionsData = this.userProfile['examQuestions'];
        console.log( this.userProfile );
      });
      this.calculateMarks( this.questionsData );
    });
  }

  ngOnInit() {
  }

  calculateMarks( questionsData ) {
    this.questionsCount = questionsData.length;
    let promise = new Promise( ( resolve, reject ) => {
      questionsData.forEach( ( element, index, array ) => {
        if( element['correct_option'] == element['selectedOption'] ) {
          this.correctAnswersCount++ ;
        }
        if( null != element['selectedOption'] ) {
          this.attemptedQuestionsCount++;
        }
        if( index == array.length-1 ) resolve();
      });
    });

    promise.then( () => {
      this.percentage = Math.round( this.correctAnswersCount/this.questionsCount*100 );
      if( this.percentage > this.passingCutOff ) {
        this.grade = 'Passed';
      } else {
        this.grade = 'Failed'
      }
    });
  }

  saveResult() {
      var pdf = new jsPDF( 'landscape', 'pt', [750, 500]);
      pdf.fromHTML(document.querySelector('#resultDiv'), 10, 10, {'width': 750, 'height': 500});
      pdf.autoPrint();
      pdf.output("dataurlnewwindow");
  }
}
