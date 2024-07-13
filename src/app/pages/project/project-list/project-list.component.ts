import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectModel } from '../../../core/model/project.model';
import { ProjectService } from '../../../core/service/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  list: ProjectModel[];
  error: string;

  constructor(private service: ProjectService, private router: Router) {}

  ngOnInit() {
    this.getList();
  }

  getList(): void {
    this.service.select().subscribe({
      next: (response) => {
        if (response.success && response.statusCode === 200) {
          this.list = response.payload;
        }
      },
      error: (error) => {
        this.error = error.error.message;
      },
    });
  }

  delete(id: number) {
    if (confirm('Are you sure to delete?')) {
      this.service.delete(id.toString()).subscribe({
        next: (response) => {
          if (response.success && response.statusCode === 200) {
            this.getList();
          } else {
            this.error = response.error;
          }
        },
        error: (error) => {
          this.error = error.error.message;
        },
      });
    }
  }
}
