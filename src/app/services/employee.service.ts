import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000/employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(BASE_URL);
  }

  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${BASE_URL}/${id}`);
  }

  create(employee: Omit<Employee, 'id'>): Observable<Employee> {
    return this.http.post<Employee>(BASE_URL, employee);
  }

  update(id: number, employee: Omit<Employee, 'id'>): Observable<Employee> {
    return this.http.put<Employee>(`${BASE_URL}/${id}`, employee);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${id}`);
  }
}
