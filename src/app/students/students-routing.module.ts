import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentEditComponent } from './student-edit/student-edit.component';


const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    children: [
      {
        path: '',
        component: StudentListComponent,
      },
      {
        path: 'profile',
        component: StudentEditComponent,
      },
      {
        path: 'profile/:id',
        component: StudentEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
