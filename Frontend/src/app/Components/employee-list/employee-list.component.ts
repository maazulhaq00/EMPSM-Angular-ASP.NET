import { Component } from '@angular/core';
import { IEmployee } from '../../interfaces/Employee';
import { HttpService } from '../../http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  
  employeeList: IEmployee[] = [];

  constructor(private httpService: HttpService){}

  ngOnInit(){
    this.fetchEmployeeRecord()
  }

  fetchEmployeeRecord(){
    this.httpService.getAllEmployees().subscribe((result)=>{
      this.employeeList = result;
      console.log(this.employeeList);
    })
  }

  edit(empId:number){
    console.log("edit ==> " + empId);
  }
  delete(empId:number){
    this.httpService.deleteEmployee(empId).subscribe(()=>{
      console.log("Record deleted");

      // this.employeeList = this.employeeList.filter((employee)=>{
      //   return employee.empId != empId
      // })
      
      this.fetchEmployeeRecord();

    })
  }
}
