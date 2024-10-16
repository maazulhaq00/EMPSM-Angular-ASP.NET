import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IEmployee } from '../../interfaces/Employee';
import { HttpService } from '../../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {

  formBuilder = inject(FormBuilder)
  httpService = inject(HttpService)
  router = inject(Router)
  toastr = inject(ToastrService)
  activatedRoute = inject(ActivatedRoute)

  empId!: number;

  isEdit: boolean = false;

  ngOnInit() {
    this.empId = this.activatedRoute.snapshot.params['id']

    if (this.empId) {
      this.isEdit = true
      this.httpService.getEmployeesById(this.empId).subscribe((result) => {
        this.employeeForm.patchValue(result)
      })
    }

    console.log("Emp Id ==> " + this.empId);
    console.log("Is Edit ==> " + this.isEdit);

  }

  employeeForm = this.formBuilder.group(
    {
      empName: ['', [Validators.required]],
      empEmail: ['', [Validators.required, Validators.email]],
      empSalary: [0, [Validators.required]]
    }
  )

  submitForm() {
    // console.log("Hello");
    console.log(this.employeeForm.value);

    let employee: IEmployee = {
      empId: this.isEdit ? this.empId : 0,
      empName: this.employeeForm.value.empName!,
      empEmail: this.employeeForm.value.empEmail!,
      empSalary: this.employeeForm.value.empSalary!,
    }

    if (this.isEdit) {
      this.httpService.updateEmployee(this.empId, employee).subscribe((result) => {

        console.log("Updated");
        this.toastr.success("Employee Updated Successfully", "Success")
        this.router.navigateByUrl('/employees')

      })
    }
    else {
      this.httpService.createEmployee(employee).subscribe((result) => {

        console.log("Inserted");
        this.toastr.success("Employee Created Successfully", "Success")
        this.router.navigateByUrl('/employees')

      })
    }
  }

}
