import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { StatmgAkitaModule } from './statmg-akita/statmg-akita.module';
import { StatmgNgxsModule } from './statmg-ngxs/statmg-ngxs.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StatmgAkitaModule,
    StatmgNgxsModule,
    AppRouting
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(router: Router) {

  }
}
