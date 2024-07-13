import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable()
export class TranslationService {
  constructor(private api: ApiService) {}

  select() {
    return this.api.get('/translation');
  }

  insert(data: any) {
    return this.api.post('/translation', data);
  }

  update(id: number, data: any) {
    return this.api.put(`/translation/${id}`, data);
  }

  delete(id: string) {
    return this.api.delete(`/translation/${id}`);
  }

  detail(id: string) {
    return this.api.get(`/translation/${id}`);
  }
}
