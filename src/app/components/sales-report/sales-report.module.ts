import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgGridAngular } from '@ag-grid-community/angular';

import { SalesReportRoutingModule } from './sales-report-routing.module';

import { DateComponent } from './date-component/date.component';
import { SortableHeaderComponent } from './header-component/sortable-header.component';
import { HeaderGroupComponent } from './header-group-component/header-group.component';
import { RendererComponent } from './renderer-component/renderer.component';
import { RichGridComponent } from './rich-grid-example/rich-grid.component';
import { ProficiencyFilter } from './filters/proficiency.component.filter';
import { SkillFilter } from './filters/skill.component.filter';

@NgModule({
  declarations: [
    DateComponent,
    SortableHeaderComponent,
    HeaderGroupComponent,
    RendererComponent,
    RichGridComponent,
    ProficiencyFilter,
    SkillFilter
  ],
  imports: [
    AgGridAngular,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SalesReportRoutingModule
  ],
  exports: [
    RichGridComponent
  ]
})
export class SalesReportModule { }
