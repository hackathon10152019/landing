import { Component, OnInit } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  statusForm: FormGroup;
  
  applicationId:string = '';

  statusName:string = '';

  corporateName: string = '';

  representativeName: string = '';

  amount: string = '';

  constructor(private httpClient: HttpClient, private backendService: BackendService, private toastr: ToastrService) { }

  ngOnInit() {
    this.statusForm = new FormGroup({      
      applicationId: new FormControl(null)
    });
  }

  onSubmit(){
    console.log("onSubmit is called");

    let applySubscription = this.backendService.getStatus(this.statusForm.get('applicationId').value);

    applySubscription.subscribe((response: any) => {
      console.log(response);
      
      this.applicationId = response.applicationId;
      this.statusName = response.statusName;
      this.corporateName = response.corporateName;
      this.representativeName =  response.representativeName;
      this.amount = response.amount;

    }, error => {
      console.log(error);
      this.toastr.error('Error', 'Error occured on getting application status!');
    });
  }

  onReject(){

  }

  onAccept(){

  }

}
