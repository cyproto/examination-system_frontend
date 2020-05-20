import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import * as jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import { element } from 'protractor';
import { Router } from '@angular/router';

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

  constructor( private router: Router, private angularFirestore: AngularFirestore ) { 
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

  logout() {
    sessionStorage.setItem( 'userEmail', null );
    this.router.navigate(['../../login']);
  }

  saveResult() {
    var pdf = new jsPDF( 'l', 'pt', [800, 470] );

    pdf.setDrawColor( 0 );
    pdf.setFillColor( 0, 0, 0 );
    pdf.roundedRect( 255, 20, 290, 55, 10, 10, 'F' );
    pdf.roundedRect( 330, 205, 130, 40, 10, 10, 'F' );

    if( this.grade == 'Passed' ) {
      pdf.setFillColor( 0, 189, 170 );
    } else if( this.grade == 'Failed' ) {
      pdf.setFillColor( 217, 69, 95 );
    }
    pdf.roundedRect( 150, 270, 100, 30, 2, 2, 'F' );

    pdf.setFont( 'Courier' );
    pdf.setFontSize( 40 );
    pdf.setTextColor( 255, 255, 255 );
    pdf.text( 270, 60, 'Certificate' );
    pdf.setFontSize( 30 );
    pdf.text( 340, 235, 'Result' );

    pdf.setFont( 'Verdana' );
    pdf.setFontStyle( 'bold', 'underline' );
    pdf.setTextColor( 0, 0, 0 );
    pdf.setFontSize( 20 );
    pdf.text( 50, 122, 'Name : ');
    pdf.text( 50, 172, 'Email : ');
    pdf.text( 410, 122, 'Exam Date : ');
    pdf.text( 50, 292, 'Grade : ');
    pdf.text( 50, 342, 'Correct Answers : ');
    pdf.text( 50, 392, 'Attempted Questions : ');
    pdf.text( 410, 292, 'Percentage : ');

    pdf.setFont( 'Courier' );
    pdf.setFontSize( 20 );
    pdf.setTextColor( 71, 79, 133 );
    pdf.text( 140, 122, this.userProfile.firstName + ' ' + this.userProfile.lastName );
    pdf.text( 140, 172, this.userProfile.email );
    pdf.text( 540, 122, new Date( this.userProfile.testEndTimeStamp * 1000 ).toDateString() );

    pdf.setTextColor( 256, 256, 256 );
    pdf.setFontStyle( 'bold' );
    pdf.text( 165, 292, this.grade );

    pdf.setFont( 'Courier' );
    pdf.setTextColor( 71, 79, 133 );
    pdf.text( 230, 342, this.correctAnswersCount + '/' + this.questionsCount );
    pdf.text( 270, 392, this.attemptedQuestionsCount + '/' + this.questionsCount );
    pdf.text( 540, 292, this.percentage.toString() + ' %' );

    pdf.setFontStyle( '' );
    pdf.setFont( 'Courier' );
    pdf.setFontSize( 10 );
    pdf.setTextColor( 0, 0, 0 );
    pdf.text( 590, 440, 'Scan QR code to verify integrity');
    pdf.text( 590, 450, 'of this certificate.');

    var img = new Image();
    img.src = '../../../assets/images/verified_logo.png';
    pdf.addImage( img, 'png', 660, 370, 50, 50 );

    pdf.save( this.userEmail + '.pdf' );  
  }
}
