import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),
          ],
        ],
        checkPassword: ['', Validators.required],
        name: ['', Validators.required],
      },
      {
        validator: this.passwordMatchValidator, // Custom validator to check password match
      }
    );
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const checkPassword = group.get('checkPassword')?.value;
    return password === checkPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    const formValues = this.signupForm.value;
    const fileInput = this.fileInput.nativeElement; // Reference to the file input element
    const file = fileInput.files[0]; // Get the selected file

    this.authService.signup(formValues, file).subscribe({
      next: (response) => {
        console.log('Signup successful', response);
        // Optionally, navigate to login page
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Signup error', error);
      },
    });
  }
}
