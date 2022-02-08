import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'main' },
    { path: 'main', component: MainComponent },
    // { path: 'feature1', loadChildren: './feature1/feature1.module#Feature1Module' },
    // { path: 'feature2', loadChildren: './feature2/feature2.module#Feature2Module' },
    // { path: 'feature3', loadChildren: './feature3/feature3.module#Feature3Module' },
    { path: '**', component: PageNotFoundComponent }
  ];

  @NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
      )
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
  