import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PagetitleComponent } from './pagetitle/pagetitle.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, PagetitleComponent],
  imports: [
    CommonModule
  ],
})
export class SharedModule { }
