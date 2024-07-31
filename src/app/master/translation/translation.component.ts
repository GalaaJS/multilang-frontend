import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
})
export class TranslationComponent implements OnInit {
  constructor(private api: ApiService, private storeData: Store<any>) {}

  @ViewChild('datatable') datatable: any;

  search = '';

  cols = [
    { field: 'translation_id', title: 'Key' },
    { field: 'str_english', title: 'English' },
    { field: 'str_french', title: 'French' },
    { field: 'str_spanish', title: 'Spanish' },
    { field: 'updated_by', title: 'Updated By' },
    { field: 'updated_at', title: 'Updated At' },
    { field: 'is_active', title: 'Is Active' },
    {
      field: 'actions',
      title: 'Actions',
      sort: false,
      headerClass: 'justify-center',
    },
  ];

  items = [];

  loading = false;

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.loading = true;
    this.api.get('/translations').subscribe((res: any) => {
      this.loading = false;
      this.items = res;
    });
  }

  deleteRow(id: string) {
    if (confirm(`Are you sure want to deactive ${id} translation?`)) {
      this.storeData.dispatch({ type: 'toggleMainLoader', payload: true });

      this.api.delete(`/translations/${id}`).subscribe({
        next: (res) => {
          if (res) {
            this.api.showSuccessToast('Translation deactivated successfully');
            this.getItems();
            this.storeData.dispatch({
              type: 'toggleMainLoader',
              payload: false,
            });
          }
        },
        error: (err) => {
          this.api.showErrorToast(err.error);
          this.storeData.dispatch({ type: 'toggleMainLoader', payload: false });
        },
      });
    }
  }
}
