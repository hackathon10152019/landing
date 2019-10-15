import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient: HttpClient) { }

  submitForm(formData){
    console.log('submitForm called');

    let apply = this.httpClient.post(environment.apiUrl + '/apply', formData);

    return apply;
  }
}
