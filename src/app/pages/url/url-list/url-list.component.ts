import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UrlModel } from '../../../core/model/url.model';
import { UrlService } from '../../../core/service/url.service';

@Component({
  selector: 'app-url-list',
  templateUrl: './url-list.component.html',
  styleUrls: ['./url-list.component.scss'],
})
export class UrlListComponent implements OnInit {
  list: UrlModel[];
  error: string;

  constructor(private service: UrlService, private router: Router) {}

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
