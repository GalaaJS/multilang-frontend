import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  constructor(private api: ApiService) {}

  @ViewChild('datatable') datatable: any;

  search = '';

  cols = [
    { field: 'user_id', title: 'User ID' },
    { field: 'username', title: 'Username' },
    { field: 'created_at', title: 'Created At' },
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
    this.api.get('/users').subscribe((res: any) => {
      this.loading = false;
      this.items = res;
    });
  }
}
