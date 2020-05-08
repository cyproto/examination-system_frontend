import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamAppComponent } from './exam-app.component';
import { TestComponent } from './test/test.component';
import { ProfileComponent } from './profile/profile.component';
import { AfterTestSubmitComponent } from './test/after-test-submit/after-test-submit.component';

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
            },
            {
                path: 'after-test-submit',
                component: AfterTestSubmitComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExamAppRoutingModule {}
