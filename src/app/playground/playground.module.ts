import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main.component';
import { PlaygroundRouting } from './playground.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PlaygroundRouting
  ],
  declarations: [MainComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PlaygroundModule { }
