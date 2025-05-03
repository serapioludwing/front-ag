import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
  imports: [
    CommonModule,
    NavbarComponent,
    FormsModule,
    RouterModule,
  ],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage = '';

  constructor(private readonly employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAll().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los empleados.';
        console.error(err);
      }
    });
  }

  delete(id: number): void {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      this.employeeService.delete(id).subscribe({
        next: () => this.loadEmployees(),
        error: (err) => {
          this.errorMessage = 'No se pudo eliminar el empleado.';
          console.error(err);
        }
      });
    }
  }
}
