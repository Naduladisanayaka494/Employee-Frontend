import { Component, OnInit } from '@angular/core';
import { Department } from '../../../models/department.model';
import { DepartmentService } from '../../../services/department/department.service';
import Swal from 'sweetalert2'; // SweetAlert import

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  departments: Department[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService
      .getDepartments(this.currentPage, this.pageSize)
      .subscribe((response) => {
        this.departments = response.content;
        this.totalPages = response.totalPages;
      });
  }

  deleteDepartment(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this department?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.departmentService.deleteDepartment(id).subscribe(() => {
          this.loadDepartments(); // Reload departments after delete
          Swal.fire('Deleted!', 'The department has been deleted.', 'success');
        });
      }
    });
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadDepartments();
  }
}
