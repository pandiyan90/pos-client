import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RichGridComponent } from './rich-grid-example/rich-grid.component';

const routes: Routes = [
  {
    path: '',
    component: RichGridComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesReportRoutingModule { }
