import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '../shared/icon/icon.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IconModule, LoginRoutingModule],
  declarations: [LoginComponent, RegisterComponent],
})
export class LoginModule {
  constructor() {}
}
