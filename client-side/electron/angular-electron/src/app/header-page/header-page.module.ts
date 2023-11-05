import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HeaderPageComponent } from './header-page.component';

const routes: Routes = [
  {
    path: 'header',
    component: HeaderPageComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
