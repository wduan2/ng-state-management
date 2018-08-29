import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { MainComponent } from './main.component';
import { ProductDetailsState, ProductState } from './product.states';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StageComponent } from './stage/stage.component';
import { StatmgNgxsRouting } from './statmg-ngxs.routing';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forRoot([
      ProductState,
      ProductDetailsState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    StatmgNgxsRouting
  ],
  declarations: [MainComponent, SidebarComponent, StageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StatmgNgxsModule { }
