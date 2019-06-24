import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaceResolver } from './place-resolver.service';
import { HomeComponent } from './pages/home.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomeComponent
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
