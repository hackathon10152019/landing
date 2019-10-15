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

    let apply = this.httpClient.post(environment.apiUrl + '/v1/loanapplication', formData);

    return apply;
  }

  getStatus(applicationId){
    console.log('submitForm called');

    let status = this.httpClient.get(environment.apiUrl + '/v1/loanapplication/status?applicationId=' + applicationId);

    return status;
  }
}
