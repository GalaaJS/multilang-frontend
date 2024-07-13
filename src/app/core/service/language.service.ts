import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable()
export class LanguageService {
  constructor(private api: ApiService) {}

  select() {
    return this.api.get('/language');
  }

  insert(data: any) {
    return this.api.post('/language', data);
  }

  update(id: number, data: any) {
    return this.api.put(`/language/${id}`, data);
  }

  delete(id: string) {
    return this.api.delete(`/language/${id}`);
  }

  detail(id: string) {
    return this.api.get(`/language/${id}`);
  }
}
