import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './core/api/api.service';
import { LanguageService } from './core/service/language.service';
import { ProjectService } from './core/service/project.service';
import { TranslationService } from './core/service/translation.service';
import { UrlService } from './core/service/url.service';
import { LanguageEditComponent } from './pages/language/language-edit/language-edit.component';
import { LanguageListComponent } from './pages/language/language-list/language-list.component';
import { ProjectEditComponent } from './pages/project/project-edit/project-edit.component';
import { ProjectListComponent } from './pages/project/project-list/project-list.component';
import { TranslationEditComponent } from './pages/translation/translation-edit/translation-edit.component';
import { TranslationListComponent } from './pages/translation/translation-list/translation-list.component';
import { UrlEditComponent } from './pages/url/url-edit/url-edit.component';
import { UrlListComponent } from './pages/url/url-list/url-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    ProjectEditComponent,
    LanguageListComponent,
    LanguageEditComponent,
    TranslationListComponent,
    TranslationEditComponent,
    UrlListComponent,
    UrlEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    provideAnimationsAsync(),
    ApiService,
    ProjectService,
    LanguageService,
    TranslationService,
    UrlService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
