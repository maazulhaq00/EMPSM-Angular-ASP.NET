import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployee } from './interfaces/Employee';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl = "https://localhost:7064/"

  constructor(private httpClient : HttpClient) { }

  getAllEmployees(){
    return this.httpClient.get<IEmployee[]>( this.baseUrl + "api/Employee");
  }
  createEmployee(employee : IEmployee){
    return this.httpClient.post<IEmployee>(this.baseUrl + "api/Employee", employee);
  }
  deleteEmployee(empId : number){
    return this.httpClient.delete(this.baseUrl + "api/Employee/" + empId);
  }
  getEmployeesById(empId : number){
    return this.httpClient.get<IEmployee>( this.baseUrl + "api/Employee/" + empId);
  }
  updateEmployee(empId : number, employee : IEmployee){
    return this.httpClient.put<IEmployee>( this.baseUrl + "api/Employee/" + empId, employee);
  }
}
