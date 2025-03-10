// src/app/modules/admin/admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';
import { EployeeDetailsComponent } from './eployee-details/eployee-details.component';
 // Import the component

@NgModule({
  declarations: [
    DashboardComponent,
    ReportsComponent,
    EployeeDetailsComponent

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule, // Add FormsModule to imports
  ],
})
export class AdminModule {}
