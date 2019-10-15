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

  applicationForm: FormGroup;  

  constructor(private httpClient: HttpClient, private backendService: BackendService, private toastr: ToastrService) { }

  ngOnInit() {
    this.statusForm = new FormGroup({      
      applicationId: new FormControl(null)
    });
  }

  onSubmit(){
    console.log("onSubmit is called");
  }

  onReject(){

  }

  onAccept(){

  }

}
