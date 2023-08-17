import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http : HttpClient) { }

  getUsers(page:Number, items:any) {
    return this.http.get(`https://reqres.in/api/users?page=${page}&per_page=${items}`)
  }

}
