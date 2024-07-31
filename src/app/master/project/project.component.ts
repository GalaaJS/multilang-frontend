import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
})
export class ProjectComponent implements OnInit {
  constructor(private api: ApiService) {}

  @ViewChild('datatable') datatable: any;

  search = '';

  cols = [
    { field: 'project_id', title: 'Project ID' },
    { field: 'name', title: 'Name' },
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
    this.api.get('/projects').subscribe((res: any) => {
      this.loading = false;
      this.items = res;
    });
  }
}
