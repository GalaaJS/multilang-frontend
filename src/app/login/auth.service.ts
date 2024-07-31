import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from '../service/api.service';
import { Authenticate } from './authenticate';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: ApiService) {}

  checkSession() {
    return this.api.get('/checkSession').pipe(
      map((response) => {
        return new UserModel(response.user_id, response.username);
      })
    );
  }

  login(model: Authenticate) {
    const content = {
      username: model.username,
      password: model.password,
    };
    return this.api.post('/auth/login', content).pipe(
      map((response) => {
        return new UserModel(response.user_id, response.username);
      })
    );
  }
}
