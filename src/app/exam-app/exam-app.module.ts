import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamAppComponent } from './exam-app.component';
import { ExamAppRoutingModule } from './exam-app.routing.module';
import { MatInputModule, MatCheckboxModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatProgressBarModule, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFirestore } from '@angular/fire/firestore';



@NgModule({
  declarations: [ExamAppComponent],
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
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers:[
    AngularFirestore
  ]
})
export class ExamAppModule { }
