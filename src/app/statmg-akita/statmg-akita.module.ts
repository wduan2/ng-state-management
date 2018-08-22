import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StageComponent } from './stage/stage.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SidebarComponent, StageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [SidebarComponent, StageComponent]
})
export class StatmgAkitaModule { }
