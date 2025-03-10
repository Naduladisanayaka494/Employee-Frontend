import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../../models/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private apiUrl = 'http://localhost:8080/api/departments'; // Adjust the URL according to your API

  constructor(private http: HttpClient) {}

  getDepartments(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  createDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, department);
  }

  updateDepartment(id: string, department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}/${id}`, department);
  }

  deleteDepartment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
