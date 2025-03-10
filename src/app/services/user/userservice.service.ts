// user.service.ts (continued)
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserDto } from '../../models/UserDto.model';
import { UserRole } from '../../models/user-role.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/auth'; // Adjust the URL

  constructor(private http: HttpClient) {}

  getUsers(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<any>(`${this.apiUrl}/users`, { params });
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signup`, user);
  }

  updateUser(userId: string, user: UserDto): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.apiUrl}/users/${userId}`, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }

  assignDepartment(userId: string, departmentId: string): Observable<User> {
    return this.http.post<User>(
      `${this.apiUrl}/${userId}/assign-department/${departmentId}`,
      {}
    );
  }

  searchUsers(
    departmentId?: string,
    userId?: string,
    userRole?: UserRole | null
  ): Observable<UserDto[]> {
    let params = new HttpParams();
    if (departmentId) {
      params = params.set('departmentId', departmentId);
    }
    if (userId) {
      params = params.set('userId', userId);
    }
    if (userRole) {
      params = params.set('userRole', userRole);
    }
    return this.http.get<UserDto[]>(`${this.apiUrl}/users/search`, { params });
  }
}
