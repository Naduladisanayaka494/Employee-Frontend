import { ChangeDetectorRef, Component } from '@angular/core';
import { StorageService } from './services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee-Mnegement';
  isStudentLoggedIn: boolean = StorageService.isEmployeeLoggedIn();
  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();

  constructor(private router: Router, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
      this.isStudentLoggedIn = StorageService.isEmployeeLoggedIn();
      this.cdRef.detectChanges();
    });
  }

  logout() {
    StorageService.logout();
    this.isAdminLoggedIn = false;
    this.isStudentLoggedIn = false;
    this.router.navigateByUrl('/login').then(() => {
      this.cdRef.detectChanges();
    });
  }
}


