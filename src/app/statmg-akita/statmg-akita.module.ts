import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { MainComponent } from './main.component';
import { StatmgAkitaRouting } from './statmg-akita.routing';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StageComponent } from './stage/stage.component';

@NgModule({
  imports: [
    CommonModule,
    AkitaNgDevtools.forRoot(),
    StatmgAkitaRouting
  ],
  declarations: [MainComponent, SidebarComponent, StageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: []
})
export class StatmgAkitaModule { }
