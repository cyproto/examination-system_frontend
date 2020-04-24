import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamAppComponent } from './exam-app.component';
import { TestComponent } from './test/test.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    {
        path: '',
        component: ExamAppComponent,
        children: [
            {
                path: 'test',
                component: TestComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExamAppRoutingModule {}
