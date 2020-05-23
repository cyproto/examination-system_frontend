import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { AngularFirestore, } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material';
import { ConfirmSubmitComponent } from './confirm-submit/confirm-submit.component';
import { TestService } from './test.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  interval: any;
  questionsArray: any = [];
  currentQuestion: any;
  userEmail: any;
  usersCollection: any;
  currentQuestionIndex: any;
  isExamSubmittedFlag: any;
  passingCutOff: number = 35;
  isGivingTestFirstTimeFlag: any;
  isStartTestClicked: boolean = false;
  instructionPageTimer: number = 60;
  testTimer: number = 600;
  testSeconds: string = '';
  testMinutes: string = '';
  testEndTimeStamp: number = 0;
  constructor(private testService: TestService, private dialog: MatDialog, private angularFirestore: AngularFirestore, private router: Router, public activatedRoute: ActivatedRoute) { 
    
    this.usersCollection = this.angularFirestore.collection('users');
    this.userEmail = sessionStorage.getItem('userEmail');
    this.isExamSubmittedFlag = sessionStorage.getItem('isExamSubmittedFlag');
    this.isGivingTestFirstTimeFlag = sessionStorage.getItem('isGivingTestFirstTimeFlag');
    console.log(this.isGivingTestFirstTimeFlag);
    router.events.subscribe((event: NavigationStart) => {
        if (event.navigationTrigger === 'popstate' || 'null' == this.userEmail ) {
          this.router.navigate(['../../login'])
        }
      });
  }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    //this.logoutUser();
  }

  ngOnInit() {
    if( this.isGivingTestFirstTimeFlag === 'true' ) { 
      this.interval = setInterval(() => {
        if( this.instructionPageTimer > 0 ) {
          this.instructionPageTimer --;
        }
        else {
          this.startTest();
        }
      }, 1000 )
    } else {
      this.startTest();
    }
  }

  startTestTimer() {
    this.interval = setInterval(() => {
      if( this.testTimer > 0 ){
        this.testTimer --;
        this.testMinutes = ( '0' + Math.floor( this.testTimer/60 ).toString() ).slice( -2 );
        this.testSeconds = ( '0' + ( this.testTimer%60 ).toString() ).slice( -2 );
      } else {
      this.submitTest( true );
      }
    }, 1000 ) 
  }

  async validateIfTestTimeIsOver(): Promise<Boolean> {
    let ifTestTimeIsOverFlag: boolean;
    await firebase.firestore().collection( 'users' ).where(firebase.firestore.FieldPath.documentId(), '==', this.userEmail).get()
    .then( result => {
      result.forEach( element => {
        console.log(element.data()['testEndTimeStamp']);
        console.log(Math.round( Date.now()/1000 ));
        if( element.data()['testEndTimeStamp'] > Math.round( Date.now()/1000 ) ) {
          console.log('in validate');
          this.testEndTimeStamp = element.data()['testEndTimeStamp'];
          ifTestTimeIsOverFlag = false;
        } else { 
          ifTestTimeIsOverFlag = true; 
        }
      });
    });
    console.log(ifTestTimeIsOverFlag);
    return ifTestTimeIsOverFlag;
  }

  async startTest() {

    clearInterval(this.interval);
    this.startTestTimer();
    this.isStartTestClicked = true;
    console.log(this.isGivingTestFirstTimeFlag);
    if( 'true' == this.isGivingTestFirstTimeFlag ) { 
      console.log(this.isGivingTestFirstTimeFlag);
      this.isGivingTestFirstTimeFlag = false;
      this.angularFirestore.collection('questions').valueChanges().subscribe(result => {
        console.log(result);
        result.forEach(element => {
          element['isTaken'] = false;
        });
        for( let i = 0; i < 10; i ++ ){
          let randomElement = Math.floor(Math.random() * result.length)
          if( result[randomElement]['isTaken'] ){
            i--;
          } else {
            this.questionsArray.push(result[randomElement]);
            result[randomElement]['isTaken'] = true;
          }
        }
        this.questionsArray.forEach(element => {
          delete element['isTaken'];
          element['isBookmarked'] = false;
          element['selectedOption'] = null;
        });
        this.currentQuestion = this.questionsArray[0];
        this.currentQuestionIndex = 0;
        console.log(this.questionsArray);
        let user = {
          examQuestions: this.questionsArray,
          isGivingTestFirstTimeFlag: this.isGivingTestFirstTimeFlag,
          testStartTimeStamp: Math.round( Date.now()/1000 ),
          testEndTimeStamp: Math.round( Date.now()/1000 + 600 ),
        }
        this.testService.updateUser(this.userEmail, user);
        sessionStorage.setItem('isGivingTestFirstTimeFlag', JSON.stringify( this.isGivingTestFirstTimeFlag ) );
      });
    } else {
      firebase.firestore().collection( 'users' ).where(firebase.firestore.FieldPath.documentId(), '==', this.userEmail).get()
      .then( result => {
        result.forEach( element => {
          this.questionsArray = [];
          this.questionsArray = element.data()['examQuestions'];
          this.currentQuestion = this.questionsArray[0];
          this.currentQuestionIndex = 0;
        });
      });
      if( !await this.validateIfTestTimeIsOver() ) {
        console.log('sadasd');
        this.isStartTestClicked = true;
        this.testTimer = this.testEndTimeStamp - Math.round( Date.now()/1000 );
        console.log(this.testTimer);
      } else {
        let user = {
          isExamSubmittedFlag: true
        }
        this.testService.updateUser(this.userEmail, user);
        this.logoutUser();
      }
    }
  }

  switchCurrentQuestion(index){
    console.log(index)
    if( index == this.currentQuestion ){
      return;
    }
    this.questionsArray[this.currentQuestionIndex] = this.currentQuestion;
    let user = {
      examQuestions: this.questionsArray
    }
    this.testService.updateUser(this.userEmail, user);
    this.currentQuestion = this.questionsArray[index];
    this.currentQuestionIndex = index;
    console.log(this.questionsArray)
  }

  submitTest( isAutoSubmit ){
    this.questionsArray[this.currentQuestionIndex] = this.currentQuestion;
    console.log(this.questionsArray);
    const dialogRef = this.dialog.open(ConfirmSubmitComponent, {
      data: { isAutoSubmit: isAutoSubmit }
    })
    dialogRef.afterClosed().subscribe(result => {
      if( result ) {
        clearInterval(this.interval);
        this.isExamSubmittedFlag = true;
        sessionStorage.setItem('isExamSubmittedFlag', JSON.stringify(this.isExamSubmittedFlag));
        let user = {
          isExamSubmittedFlag: this.isExamSubmittedFlag,
          examQuestions: this.questionsArray
        }
        this.testService.updateUser(this.userEmail, user);

        let requestBody = {
          emailId: this.userEmail, 
          questionsData: this.questionsArray,
          passingCutOff: this.passingCutOff
        }
        this.testService.sendResult( requestBody ).subscribe( data => {
          console.log( 'inserted' );
        });

        this.router.navigate(['./after-test-submit'], {relativeTo: this.activatedRoute})
      } else {
        return;
      }
    });
  }

  logoutUser() {
    sessionStorage.setItem( 'userEmail', null );
    this.router.navigate(['../../login']);
  }

  toggleBookmark(){
    this.currentQuestion['isBookmarked'] = !this.currentQuestion['isBookmarked'];
  }
}
