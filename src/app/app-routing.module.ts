import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';     // Add this
import { Quiz2Component } from './quiz2/quiz2.component';  // Add this

const routes: Routes = [
  {
    path: '',
    component: QuizComponent
  },
  {
    path: 'quiz2',
    component: Quiz2Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
