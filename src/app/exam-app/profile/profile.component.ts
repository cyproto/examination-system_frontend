import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import * as jsPDF from 'jspdf';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userEmail: string = '';
  getResultApiResponse: any;
  userProfile: any;
  questionsData: any;
  questionsCount: number = 0;
  correctAnswersCount: number = 0;
  attemptedQuestionsCount: number = 0;
  percentage: number = 0;
  passingCutOff: number = 35;
  grade: String;
  qrCodeString = 'https://exam-result-panel.firebaseapp.com/view-result?emailId=';

  constructor( private profileService: ProfileService, private router: Router, private angularFirestore: AngularFirestore ) { 
    
    this.userEmail = sessionStorage.getItem( 'userEmail' );
    this.qrCodeString += this.userEmail;
    this.getResultFromBlockchain();
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

  getResultFromBlockchain() {
    this.profileService.getResult( this.userEmail ).subscribe( data => {
      console.log( data );
      this.questionsData = data['examQuestions'];
      this.grade = data['grade'];
      this.correctAnswersCount = data['correctAnswersCount'];
      this.percentage = data['percentage'];
      this.questionsCount = data['questionsCount'];
      data['examQuestions'].forEach( ( element, index, array ) => {
        if( null != element['selectedOption'] ) {
          this.attemptedQuestionsCount++;
        }
      });
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
    
    var verifiedLogo = new Image();
    verifiedLogo.src = '../../../assets/images/verified_logo.png';
    pdf.addImage( verifiedLogo, 'png', 660, 370, 50, 50 );

    var qrCodeElement = document.getElementById('qrCode').firstChild.firstChild;
    pdf.addImage(qrCodeElement, 'png', 400, 310, 150, 150 )

    pdf.save( this.userEmail + '.pdf' );
  }
}
