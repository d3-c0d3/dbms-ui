import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const API_SEMESTER=environment.apiBaseLink+'/api/course/'
@Injectable({
  providedIn: 'root'
})
export class CourseService {
//getCourseEnrollmentData
constructor(
  private httpClient:HttpClient,
) { }

getCourseEnrollmentData(data){
  
  return this.httpClient.post<{ data:any[],message: string }>( API_SEMESTER+ 'get-course-enrollment-data', data);
}
}
