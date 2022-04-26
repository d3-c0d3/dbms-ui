import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const API_URL_ADMIN=environment.apiBaseLink+'/api/school/'
@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(
   private httpClient:HttpClient
    ) { }

  getAllSchools() {
    console.log(API_URL_ADMIN+'get-all-schools')
    return this.httpClient.get<{ data: any }>(API_URL_ADMIN + 'get-all-schools');
  }
}
