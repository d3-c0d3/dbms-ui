import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const API_SEMESTER=environment.apiBaseLink+'/api/section/'
@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(
    private httpClient:HttpClient,
  ) { }

  getAllSectionByYearAndSemester(year,semester){
    const data={
      year:year,
      semester:semester
    }
    return this.httpClient.post<{ message: string }>( API_SEMESTER+ 'get-all-sections-by-semester', data);
  }
}
