import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
})
export class UrlComponent implements OnInit {
  constructor(private api: ApiService) {}

  @ViewChild('datatable') datatable: any;

  search = '';

  cols = [
    { field: 'url_id', title: 'URL ID' },
    { field: 'url', title: 'URL' },
    { field: 'description', title: 'Description' },
    { field: 'updated_by', title: 'Updated By' },
    { field: 'updated_at', title: 'Updated At' },
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
    this.api.get('/urls').subscribe((res: any) => {
      this.loading = false;
      this.items = res;
    });
  }
}
