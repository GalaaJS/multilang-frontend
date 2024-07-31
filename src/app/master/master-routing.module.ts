import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectAddComponent } from './project/project-add/project-add.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { ProjectComponent } from './project/project.component';
import { TranslationAddComponent } from './translation/translation-add/translation-add.component';
import { TranslationEditComponent } from './translation/translation-edit/translation-edit.component';
import { TranslationComponent } from './translation/translation.component';
import { UrlAddComponent } from './url/url-add/url-add.component';
import { UrlEditComponent } from './url/url-edit/url-edit.component';
import { UrlComponent } from './url/url.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'project',
    pathMatch: 'full',
  },
  {
    path: 'project',
    component: ProjectComponent,
  },
  {
    path: 'project/add',
    component: ProjectAddComponent,
  },
  {
    path: 'project/edit/:id',
    component: ProjectEditComponent,
  },
  {
    path: 'url',
    component: UrlComponent,
  },
  {
    path: 'url/add',
    component: UrlAddComponent,
  },
  {
    path: 'url/edit/:id',
    component: UrlEditComponent,
  },
  {
    path: 'translation',
    component: TranslationComponent,
  },
  {
    path: 'translation/add',
    component: TranslationAddComponent,
  },
  {
    path: 'translation/edit/:id',
    component: TranslationEditComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'user/add',
    component: UserAddComponent,
  },
  {
    path: 'user/edit/:id',
    component: UserEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterRoutingModule {}
