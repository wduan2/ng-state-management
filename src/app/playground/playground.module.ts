import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { PlaygroundRouting } from './playground.routing';

@NgModule({
  imports: [
    CommonModule,
    PlaygroundRouting
  ],
  declarations: [MainComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PlaygroundModule { }
