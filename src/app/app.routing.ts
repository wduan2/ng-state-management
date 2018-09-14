import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaygroundModule } from './playground/playground.module';
import { StatmgAkitaModule } from './statmg-akita/statmg-akita.module';
import { StatmgNgxsModule } from './statmg-ngxs/statmg-ngxs.module';

const appRoutes: Routes = [
    { path: '', redirectTo: '/akita', pathMatch: 'full' },
    { path: 'akita', loadChildren: () => StatmgAkitaModule },
    { path: 'ngxs', loadChildren: () => StatmgNgxsModule },
    { path: 'pg', loadChildren: () => PlaygroundModule }
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
