import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main/main.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'students',
    loadChildren: () => import('./students/students.module').then((m) => m.StudentsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
