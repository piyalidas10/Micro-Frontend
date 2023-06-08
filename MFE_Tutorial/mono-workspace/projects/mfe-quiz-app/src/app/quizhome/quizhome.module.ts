import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { QuizcontainerDirective, QuizhomeComponent } from './quizhome.component';
import { QuizresultComponent } from '../quizresult/quizresult.component';
import { QuizexpandComponent } from '../quizexpand/quizexpand.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@NgModule({
  declarations: [
    QuizhomeComponent,
    QuizhomeComponent,
    QuizcontainerDirective,
    QuizexpandComponent,
    QuizresultComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: QuizhomeComponent
      }
    ])
  ],
  providers: [ApiService],
})
export class QuizhomeModule { }
