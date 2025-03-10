import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/userservice.service';
import { DepartmentService } from '../../../services/department/department.service';
import { User } from '../../../models/user.model';
import { Department } from '../../../models/department.model';
import { UserDto } from '../../../models/UserDto.model';
import { UserRole } from '../../../models/user-role.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eployee-details',
  templateUrl: './eployee-details.component.html',
  styleUrls: ['./eployee-details.component.css'],
})
export class EployeeDetailsComponent implements OnInit {
  users: UserDto[] = [];
  departments: Department[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  newUser: User = {
    name: '',
    email: '',
    password: '',
    // userRole: UserRole.EMPLOYEE, // Default role
    // department: null,
    // profilePhotoPath: '',
    // id: '',
  };
  userToEdit: UserDto = {
    id: '',
    name: '',
    email: '',
    userRole: UserRole.EMPLOYEE,
    profilePhotoPath: '',
  };
  selectedDepartmentId: string = '';
  searchDepartmentId: string = '';
  searchUserId: string = '';
  searchUserRole: UserRole | null = null;
  userRoles = Object.values(UserRole);

  constructor(
    private userService: UserService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadDepartments();
  }

  loadUsers(): void {
    this.userService.getUsers(this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.users = response.content; // Access the content array
        this.totalPages = response.totalPages;
      },
      (error) => {
        console.error('Error loading users:', error);
        Swal.fire('Error!', 'Failed to load users.', 'error');
      }
    );
  }

  loadDepartments(): void {
    this.departmentService.getDepartments(0, 100).subscribe(
      // Load all departments
      (response) => {
        this.departments = response.content;
      },
      (error) => {
        console.error('Error loading departments:', error);
        Swal.fire('Error!', 'Failed to load departments.', 'error');
      }
    );
  }

  addUser(): void {
    this.userService.createUser(this.newUser).subscribe(
      () => {
        this.loadUsers();
        Swal.fire('Success!', 'User added successfully.', 'success');
      },
      (error) => {
        console.error('Error adding user:', error);
        Swal.fire('Error!', 'Failed to add user.', 'error');
      }
    );
  }

  editUser(userId: string): void {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      this.userToEdit = { ...user };
    }
  }

  updateUser(): void {
    this.userService.updateUser(this.userToEdit.id, this.userToEdit).subscribe(
      () => {
        this.loadUsers();
        Swal.fire('Success!', 'User updated successfully.', 'success');
      },
      (error) => {
        console.error('Error updating user:', error);
        Swal.fire('Error!', 'Failed to update user.', 'error');
      }
    );
  }

  deleteUser(userId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(userId).subscribe(
          () => {
            this.loadUsers();
            Swal.fire('Deleted!', 'User deleted successfully.', 'success');
          },
          (error) => {
              this.loadUsers();
            console.error('Deleted!', 'User deleted successfully.', 'success');
            Swal.fire('Deleted!', 'User deleted successfully.', 'success');
              this.loadUsers();
          }
        );
      }
    });
  }
  setUserToAssign(user: UserDto): void {
    this.userToEdit = { ...user }; // Copy user details
    this.selectedDepartmentId = ''; // Reset department selection
  }



  assignDepartment(userId: string): void {
    this.userService
      .assignDepartment(userId, this.selectedDepartmentId)
      .subscribe(
        () => {
          this.loadUsers();
          Swal.fire('Success!', 'Department assigned successfully.', 'success');
        },
        (error) => {
          console.error('Error assigning department:', error);
          Swal.fire('Error!', 'Failed to assign department.', 'error');
        }
      );
  }

  searchUsers(): void {
    this.userService
      .searchUsers(
        this.searchDepartmentId,
        this.searchUserId,
        this.searchUserRole
      )
      .subscribe(
        (users) => {
          this.users = users;
        },
        (error) => {
          console.error('Error searching users:', error);
          Swal.fire('Error!', 'Failed to search users.', 'error');
        }
      );
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadUsers();
  }
}
