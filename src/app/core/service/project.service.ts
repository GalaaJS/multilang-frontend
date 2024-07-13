import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable()
export class ProjectService {
  constructor(private api: ApiService) {}

  select() {
    return this.api.get('/project');
  }

  insert(data: any) {
    return this.api.post('/project', data);
  }

  update(id: number, data: any) {
    return this.api.put(`/project/${id}`, data);
  }

  delete(id: string) {
    return this.api.delete(`/project/${id}`);
  }

  detail(id: string) {
    return this.api.get(`/project/${id}`);
  }
}
