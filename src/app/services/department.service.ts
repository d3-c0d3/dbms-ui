import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const API_SEMESTER=environment.apiBaseLink+'/api/department/'
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private httpClient:HttpClient,
  ) { }

  getAllSectionByYearAndSemester(data){
    
    return this.httpClient.post<{ message: string }>( API_SEMESTER+ 'get-all-department-by-semester', data);
  }
  getSectionByCapacity(data){
    return this.httpClient.post<{ data:any, message: string }>( API_SEMESTER+ 'get-section-by-capacity', data);
  }
}
