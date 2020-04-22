import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore, } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  kitchenCollection: any;
  constructor(private router: Router, public angularFirestore: AngularFirestore, private formBuilder: FormBuilder) {
    this.kitchenCollection = this.angularFirestore.collection('kitchen')
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        email: null,
        password: null
      });
  }
  onLogin() {
    let kitchenId = this.loginForm.value.kitchenId;
    const kitchenRef = this.kitchenCollection.doc(kitchenId);
    kitchenRef.get().toPromise()
    .then((docSnapshot) => {
    if (docSnapshot.exists) {
      this.router.navigate(['/visit-kitchen'], {queryParams: {kitchenId: kitchenId}});
    } else {
      console.log(false + this.loginForm.value.kitchenId)
    }
});


}

}
