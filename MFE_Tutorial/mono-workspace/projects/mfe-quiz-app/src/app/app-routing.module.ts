import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizhomeComponent } from './quizhome/quizhome.component';

const routes: Routes = [
  {path: '', redirectTo: '/quizhome', pathMatch: 'full'},
  {path: 'quizhome', component: QuizhomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
