import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamAppComponent } from './exam-app.component';
import { ExamAppRoutingModule } from './exam-app-routing.module';
import { MatRadioModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatProgressBarModule, MatIconModule, MatListModule, MatDividerModule, MatRippleModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFirestore } from '@angular/fire/firestore';
import { TestComponent } from './test/test.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfirmSubmitComponent } from './test/confirm-submit/confirm-submit.component';
import { AfterTestSubmitComponent } from './test/after-test-submit/after-test-submit.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [ExamAppComponent, TestComponent, ProfileComponent, ConfirmSubmitComponent, AfterTestSubmitComponent],
  imports: [
    CommonModule,
    ExamAppRoutingModule,
    CommonModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatRippleModule,
    MatRadioModule,
    MatDialogModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    QRCodeModule,
    MatProgressSpinnerModule
  ],
  providers:[
    AngularFirestore
  ],
  entryComponents: [
    ConfirmSubmitComponent
  ]
})
export class ExamAppModule { }
