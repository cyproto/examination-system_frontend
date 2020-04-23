import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamAppComponent } from './exam-app.component';

const routes: Routes = [
    {
        path: '',
        component: ExamAppComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExamAppRoutingModule {}
