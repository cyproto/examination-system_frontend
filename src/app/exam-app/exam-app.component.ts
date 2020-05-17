import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-exam-app',
  templateUrl: './exam-app.component.html',
  styleUrls: ['./exam-app.component.scss']
})
export class ExamAppComponent implements OnInit {

  constructor(private location: PlatformLocation, private router: Router, public activatedRoute: ActivatedRoute) { 
    if( 'true' == sessionStorage.getItem('isExamSubmittedFlag') ){
      this.router.navigate(['profile'], {relativeTo: this.activatedRoute});
    } else {
      this.router.navigate(['test'], {relativeTo: this.activatedRoute})
    }
    
  }

  ngOnInit() {
    console.log(sessionStorage.getItem('isGivingTestFirstTimeFlag'));
    console.log(sessionStorage.getItem('isExamSubmittedFlag'));
  
    
  }

}
