import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { AngularFirestore, } from '@angular/fire/firestore';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  interval: any;
  questionsArray: any = [];
  currentQuestion: any;
  currentQuestionIndex: any;
  isExamSubmittedFlag: any;
  isGivingTestFirstTimeFlag: any;
  isStartTestClicked: boolean = false;
  instructionPageTimer: number = 5;
  testTimer: number = 600;
  constructor(private angularFirestore: AngularFirestore, private router: Router, public activatedRoute: ActivatedRoute) { 
    this.isExamSubmittedFlag = sessionStorage.getItem('isExamSubmittedFlag');
    this.isGivingTestFirstTimeFlag = sessionStorage.getItem('isGivingTestFirstTimeFlag');
    if( !this.isGivingTestFirstTimeFlag ){
      this.isStartTestClicked = true;
    }
    router.events.subscribe((event: NavigationStart) => {
        if (event.navigationTrigger === 'popstate') {
          this.router.navigate(['../../login'])
        }
      });
  }

  ngOnInit() {
    if( this.isGivingTestFirstTimeFlag ){ 
      this.interval = setInterval(() => {
        if( this.instructionPageTimer > 0 ){
          this.instructionPageTimer --;
        }
        else {
          this.startTest();
        }
      }, 1000)
    }
  }

  startTest(){
    clearInterval(this.interval);
    this.isStartTestClicked = true;
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
    });
  }

  switchCurrentQuestion(index){
    console.log(index)
    if( index == this.currentQuestion ){
      return;
    }
    this.questionsArray[this.currentQuestionIndex] = this.currentQuestion;
    this.currentQuestion = this.questionsArray[index];
    this.currentQuestionIndex = index;
    console.log(this.questionsArray)
  }

  toggleBookmark(){
    this.currentQuestion['isBookmarked'] = !this.currentQuestion['isBookmarked'];
  }
}
