import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable()
export class UrlService {
  constructor(private api: ApiService) {}

  select() {
    return this.api.get('/url');
  }

  insert(data: any) {
    return this.api.post('/url', data);
  }

  update(id: number, data: any) {
    return this.api.put(`/url/${id}`, data);
  }

  delete(id: string) {
    return this.api.delete(`/url/${id}`);
  }

  detail(id: string) {
    return this.api.get(`/url/${id}`);
  }
}
