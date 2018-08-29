import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatmgAkitaModule } from './statmg-akita/statmg-akita.module';
import { StatmgNgxsModule } from './statmg-ngxs/statmg-ngxs.module';

const appRoutes: Routes = [
    { path: '', redirectTo: '/akita', pathMatch: 'full' },
    { path: 'akita', loadChildren: () => StatmgAkitaModule },
    { path: 'ngxs', loadChildren: () => StatmgNgxsModule }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouting { }
