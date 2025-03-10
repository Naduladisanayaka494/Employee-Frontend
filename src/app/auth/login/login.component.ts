import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginform = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    if (this.loginform.valid) {
      this.authService.login(this.loginform.value).subscribe({
        next: (res) => {
          console.log(res);

          if (res.userId != null) {
            const user = {
              id: res.userId,
              role: res.userRole,
            };
            StorageService.saveUser(user);
            StorageService.saveToken(res.jwt);

            if (StorageService.isAdminLoggedIn()) {
              this.router.navigateByUrl('admin/reports');
            } else if (StorageService.isEmployeeLoggedIn()) {
              this.router.navigateByUrl('employee/dashboard');
            }

            // SweetAlert for successful login
            Swal.fire({
              title: 'Success!',
              text: 'Logged in successfully!',
              icon: 'success',
              confirmButtonText: 'OK',
            });
          }
        },
        error: (err) => {
          console.error(err);

          // SweetAlert for error
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong. Please try again!',
            icon: 'error',
            confirmButtonText: 'Close',
          });
        },
      });
    } else {

      Swal.fire({
        title: 'Error!',
        text: 'Please fill in the required fields correctly!',
        icon: 'warning',
        confirmButtonText: 'Close',
      });
    }
  }
}
