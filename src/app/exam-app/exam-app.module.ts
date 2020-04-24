import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamAppComponent } from './exam-app.component';
import { ExamAppRoutingModule } from './exam-app-routing.module';
import { MatRadioModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatProgressBarModule, MatIconModule, MatListModule, MatDividerModule, MatRippleModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFirestore } from '@angular/fire/firestore';
import { TestComponent } from './test/test.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [ExamAppComponent, TestComponent, ProfileComponent],
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
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers:[
    AngularFirestore
  ]
})
export class ExamAppModule { }
