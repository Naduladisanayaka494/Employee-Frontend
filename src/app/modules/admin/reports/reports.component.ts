import { DepartmentAdd } from './../../../models/deparmentadd.model';
import { Component, OnInit } from '@angular/core';
import { Department } from '../../../models/department.model';
// import { DepartmentAdd } from '../../../models/deparmentadd.model';
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

  // For Add Department Modal
  newDepartment: DepartmentAdd = {
    name: '',
    description: ''
  };

  // For Edit Department Modal
  departmentToEdit: Department = { id: '', name: '', description: '' };

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

  addDepartment(): void {
    this.departmentService.createDepartment(this.newDepartment).subscribe(
      (response) => {
        this.departments.push(response);
        this.loadDepartments();
        Swal.fire('Success!', 'Department added successfully', 'success');
      },
      (error) => {
        Swal.fire(
          'Error!',
          'There was an error adding the department',
          'error'
        );
      }
    );
  }

  editDepartment(id: string): void {
    this.departmentService.getDepartmentById(id).subscribe((department) => {
      this.departmentToEdit = { ...department };
    });
  }

  updateDepartment(): void {
    this.departmentService
      .updateDepartment(this.departmentToEdit.id, this.departmentToEdit)
      .subscribe(
        (response) => {
          this.loadDepartments();
          Swal.fire('Success!', 'Department updated successfully', 'success');
        },
        (error) => {
          Swal.fire(
            'Error!',
            'There was an error updating the department',
            'error'
          );
        }
      );
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
