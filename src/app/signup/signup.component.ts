import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MustMatch } from './password-validator.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, } from 'rxjs';
import { finalize } from 'rxjs/operators';
import * as bcrypt from 'bcryptjs';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  ref: any;
  task: any;
  minDate: Date;
  maxDate: Date;
  submitted: boolean = false;
  usersCollection: any;
  userAlreadyExistsFlag : boolean = false;
  public signupForm: FormGroup;
  photoUploadProgress: Observable<number>;
  photoDownloadUrl: Observable<number>;
  constructor(private signupService: SignupService, private router: Router, private afStorage: AngularFireStorage, public angularFirestore: AngularFirestore, private formBuilder: FormBuilder) {
    this.usersCollection = this.angularFirestore.collection('users');
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 30, 0, 0);
    this.maxDate = new Date(currentYear - 12, 0, 0);
    console.log(this.minDate);
    this.photoDownloadUrl = null;
  }

  get f() { return this.signupForm.controls; }

  ngOnInit() {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let phoneRegex = /^\d{10}$/;
    this.signupForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      middleName: [null, Validators.required],
      dob: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(emailRegex)]],
      phone: [null, [Validators.required,Validators.pattern(phoneRegex)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, Validators.required],
    }, {
    validator: MustMatch('password', 'confirmPassword')
    });
  }

  onSignup(){
    this.submitted = true;
    if ( this.signupForm.invalid ) {
        return;
    }
    const userRef = this.usersCollection.doc(this.signupForm.value.email);
    userRef.get().toPromise().then((docSnapshot) => {
    if ( docSnapshot.exists ) {
      this.userAlreadyExistsFlag = true;
      return;
      }
    
    if( null == this.photoDownloadUrl ){
      return;
    }
    let formData = this.signupForm.value;
    formData['photoUrl'] = this.photoDownloadUrl;
    formData['password'] = bcrypt.hashSync(this.signupForm.value.password, 10);
    formData['examSubmittedFlag'] = false;
    delete formData['confirmPassword'];
    this.signupService.addUser(formData);
    this.router.navigate(['/login'], {queryParams: {email: this.signupForm.value.email}});
  });
}

  onCancel(){
    this.submitted = false;
    this.photoDownloadUrl = null;
    this.photoUploadProgress = null;
  }

  uploadPhoto( event ) {
    console.log(event);
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref('/images/' + id);
    this.task = this.ref.put(event.target.files[0]);
    this.photoUploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        console.log(this.ref.getDownloadURL().subscribe(url => {
          this.photoDownloadUrl = url;
          alert('Photo uploaded successfully');
        }));
      })
    ).subscribe();
  }
}
