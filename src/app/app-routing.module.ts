
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DictionaryComponent } from './components/dictionary/dictionary.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [
  { path: 'landing', component: LandingPageComponent },
  { path: 'dictionary', component: DictionaryComponent }, // Route for dictionary page
  { path: '', redirectTo: '/landing', pathMatch: 'full' }, // Redirect to dictionary by default
  { path: '**', redirectTo: '/dictionary' } // Catch-all route (404 handling)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
