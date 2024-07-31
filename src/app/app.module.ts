import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

// service
import { AppService } from './service/app.service';

// i18n
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// store
import { StoreModule } from '@ngrx/store';
import { authReducer } from './+state/auth.reducer';
import { indexReducer } from './store/index.reducer';

// headlessui
import { MenuModule } from 'headlessui-angular';

// perfect-scrollbar
import { NgScrollbarModule } from 'ngx-scrollbar';

// Layouts
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';

import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './+state/auth.effects';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './layouts/footer';
import { HeaderComponent } from './layouts/header';
import { SidebarComponent } from './layouts/sidebar';
import { ThemeCustomizerComponent } from './layouts/theme-customizer';
import { AuthService } from './login/auth.service';
import { ApiService } from './service/api.service';
import { IconModule } from './shared/icon/icon.module';

@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    AppRoutingModule,
    BrowserModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
    StoreModule.forRoot({ index: indexReducer, auth: authReducer }),
    // StoreModule.forRoot({ auth: authReducer }),
    EffectsModule.forRoot([AuthEffects]),
    NgScrollbarModule,
    IconModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ThemeCustomizerComponent,
    AppLayout,
    AuthLayout,
  ],
  providers: [provideHttpClient(), Title, AppService, ApiService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
