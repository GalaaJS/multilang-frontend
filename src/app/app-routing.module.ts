import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanguageEditComponent } from './pages/language/language-edit/language-edit.component';
import { LanguageListComponent } from './pages/language/language-list/language-list.component';
import { ProjectEditComponent } from './pages/project/project-edit/project-edit.component';
import { ProjectListComponent } from './pages/project/project-list/project-list.component';
import { TranslationEditComponent } from './pages/translation/translation-edit/translation-edit.component';
import { TranslationListComponent } from './pages/translation/translation-list/translation-list.component';
import { UrlEditComponent } from './pages/url/url-edit/url-edit.component';
import { UrlListComponent } from './pages/url/url-list/url-list.component';

const routes: Routes = [
  { path: 'project', component: ProjectListComponent },
  {
    path: 'project/edit',
    component: ProjectEditComponent,
  },
  {
    path: 'project/edit/:id',
    component: ProjectEditComponent,
  },
  { path: 'language', component: LanguageListComponent },
  {
    path: 'language/edit',
    component: LanguageEditComponent,
  },
  {
    path: 'language/edit/:id',
    component: LanguageEditComponent,
  },
  { path: 'translation', component: TranslationListComponent },
  {
    path: 'translation/edit',
    component: TranslationEditComponent,
  },
  {
    path: 'translation/edit/:id',
    component: TranslationEditComponent,
  },
  { path: 'url', component: UrlListComponent },
  {
    path: 'url/edit',
    component: UrlEditComponent,
  },
  {
    path: 'url/edit/:id',
    component: UrlEditComponent,
  },
  { path: '', redirectTo: '/language', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
