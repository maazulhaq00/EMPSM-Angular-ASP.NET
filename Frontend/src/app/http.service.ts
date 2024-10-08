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
}
