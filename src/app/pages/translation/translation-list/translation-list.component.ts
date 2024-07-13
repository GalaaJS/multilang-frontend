import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TranslationModel } from '../../../core/model/translation.model';
import { TranslationService } from '../../../core/service/translation.service';

@Component({
  selector: 'app-translation-list',
  templateUrl: './translation-list.component.html',
  styleUrls: ['./translation-list.component.scss'],
})
export class TranslationListComponent implements OnInit {
  list: TranslationModel[];
  error: string;

  constructor(private service: TranslationService, private router: Router) {}

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
