import { Component } from '@angular/core';
import { IEmployee } from '../../interfaces/Employee';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  
  employeeList: IEmployee[] = [];

  constructor(private httpService: HttpService){}

  ngOnInit(){
    this.httpService.getAllEmployees().subscribe((result)=>{
      this.employeeList = result;

      console.log(this.employeeList);
      
    })
  }
}
