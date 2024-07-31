import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { checkSession } from './+state/auth.actions';
import { AuthState } from './+state/auth.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'multilang-frontend';

  constructor(private store: Store<AuthState>) {}

  ngOnInit() {
    this.store.dispatch(checkSession());
  }
}
