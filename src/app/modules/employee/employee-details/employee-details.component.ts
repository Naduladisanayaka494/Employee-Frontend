import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user/userservice.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  employeeId: string | null = null;
  users: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient, private userservice: UserService) {}

  ngOnInit(): void {
    // Get Employee ID from Local Storage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.employeeId = JSON.parse(userData).id;
      this.searchUsers();
    } else {
      this.errorMessage = 'No Employee ID found in Local Storage.';
    }
  }

  searchUsers(): void {
    this.isLoading = true;
    this.userservice.searchUsers(null, this.employeeId).subscribe({
      next: (users) => {
        this.users = users; // API response is an array, so we directly assign it
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error fetching employee details.';
        console.error('Error searching users:', error);
        this.isLoading = false;
      },
    });
  }
}
