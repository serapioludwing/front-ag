import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
  imports: [
    CommonModule,
    NavbarComponent,
    FormsModule,
    RouterModule,
  ],
})
export class EmployeeFormComponent implements OnInit {
  isEditMode = false;
  employee: Omit<Employee, 'id'> = { name: '', surname: '' };
  id!: number;
  errorMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly employeeService: EmployeeService
  ) { }

  ngOnInit() {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.isEditMode = true;
      this.id = Number(paramId);

      this.employeeService.getById(this.id).subscribe({
        next: (employee) => {
          this.employee = {
            name: employee.name,
            surname: employee.surname,
            salary: employee.salary,
            age: employee.age,
          };
        },
        error: (err) => {
          this.errorMessage = 'Empleado no encontrado.';
          console.error(err);
          this.router.navigate(['/employees']);
        }
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.employeeService.update(this.id, this.employee).subscribe({
        next: () => this.router.navigate(['/employees']),
        error: (err) => {
          this.errorMessage = 'Error al actualizar el empleado.';
          console.error(err);
        }
      });
    } else {
      if (!this.employee.name || !this.employee.surname || !this.employee.age || !this.employee.salary) {
        alert('Debes completar todos los campos para poder guardar al empleado')
      } else {
        this.employeeService.create(this.employee).subscribe({
          next: () => this.router.navigate(['/employees']),
          error: (err) => {
            this.errorMessage = 'Error al crear el empleado.';
            console.error(err);
          }
        });
      }
    }
  }
}
