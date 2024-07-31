import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '@bhplugin/ng-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { IconModule } from '../shared/icon/icon.module';
import { MasterRoutingModule } from './master-routing.module';
import { ProjectAddComponent } from './project/project-add/project-add.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { ProjectComponent } from './project/project.component';
import { UrlAddComponent } from './url/url-add/url-add.component';
import { UrlEditComponent } from './url/url-edit/url-edit.component';
import { UrlComponent } from './url/url.component';
import { TranslationComponent } from './translation/translation.component';
import { TranslationAddComponent } from './translation/translation-add/translation-add.component';
import { TranslationEditComponent } from './translation/translation-edit/translation-edit.component';
import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';

@NgModule({
  imports: [
    MasterRoutingModule,
    CommonModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    DataTableModule,
  ],
  declarations: [
    ProjectComponent,
    ProjectAddComponent,
    ProjectEditComponent,
    UrlComponent,
    UrlAddComponent,
    UrlEditComponent,
    TranslationComponent,
    TranslationAddComponent,
    TranslationEditComponent,
    UserComponent,
    UserAddComponent,
    UserEditComponent,
  ],
})
export class MasterModule {
  constructor() {}
}
