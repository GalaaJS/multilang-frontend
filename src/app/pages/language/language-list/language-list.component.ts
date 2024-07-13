import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LanguageModel } from '../../../core/model/language.model';
import { LanguageService } from '../../../core/service/language.service';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.scss'],
})
export class LanguageListComponent implements OnInit {
  list: LanguageModel[];
  error: string;

  constructor(private service: LanguageService, private router: Router) {}

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
