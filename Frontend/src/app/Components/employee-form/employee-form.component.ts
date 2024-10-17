import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IEmployee } from '../../interfaces/Employee';
import { HttpService } from '../../http.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  
  activatedRoute = inject(ActivatedRoute)

  empId! : number;

  isEdit : boolean = false;

  ngOnInit(){
    this.empId = this.activatedRoute.snapshot.params['id']

    if(this.empId){
      this.isEdit = true
      this.httpService.getEmployeesById(this.empId).subscribe((result)=>{
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
    console.log("Hello");
    console.log(this.employeeForm.value);

    let employee : IEmployee = {
      empId: 0,
      empName: this.employeeForm.value.empName!,
      empEmail: this.employeeForm.value.empEmail!,
      empSalary: this.employeeForm.value.empSalary!,
    }

    this.httpService.createEmployee(employee).subscribe((result)=>{

      console.log("Inserted");
      this.router.navigateByUrl('/employees')

    })



  }

}
